import { prisma } from "~/db.server";
import type {
  ShiftInfoGetPayload,
  ShiftInfoSelect
} from "~/generated/prisma/models";

const shiftSelect = {
  id: true,
  bossName: true,
  bossEmail: true,
  bossPhone: true,
  boySlots: true,
  girlSlots: true,
  boySlotsReserve: true,
  girlSlotsReserve: true,
  maxFreeDisplay: true,
  startDate: true,
  length: true
} satisfies ShiftInfoSelect;

type Shift = ShiftInfoGetPayload<{ select: typeof shiftSelect }>;
type RemainingSlots = { [shiftNr: number]: { M: number; F: number } };

interface FreeSlots {
  // False when the database is unreachable.
  available: boolean;
  shifts: Shift[];
  remainingSlots: RemainingSlots;
}

export const getFreeSlots = async (): Promise<FreeSlots> => {
  try {
    const shifts = await prisma.shiftInfo.findMany({ select: shiftSelect });

    const remainingSlots: RemainingSlots = {};
    shifts.forEach((shift) => {
      remainingSlots[shift.id] = {
        M: shift.boySlots - shift.boySlotsReserve,
        F: shift.girlSlots - shift.girlSlotsReserve
      };
    });

    const registrations = await prisma.registration.findMany({
      where: {
        isRegistered: true
      },
      select: {
        shiftNr: true,
        child: {
          select: {
            sex: true
          }
        }
      }
    });

    registrations.forEach((registration) => {
      remainingSlots[registration.shiftNr][registration.child.sex] -= 1;
    });

    // Display the max number of slots, disregarding reserve, in case nobody
    // has been registered yet. This prevents confusion as to why registration
    // counters are lower than expected at the start of the registration period.
    // Otherwise, cap the number of remaining slots based on the display cap.
    shifts.forEach((shift) => {
      const maxFreeBoySlots = shift.boySlots - shift.boySlotsReserve;
      const maxFreeGirlSlots = shift.girlSlots - shift.girlSlotsReserve;
      if (
        remainingSlots[shift.id].M >= 0 &&
        remainingSlots[shift.id].M === maxFreeBoySlots
      ) {
        remainingSlots[shift.id].M = shift.boySlots;
      } else if (remainingSlots[shift.id].M > shift.maxFreeDisplay) {
        remainingSlots[shift.id].M = shift.maxFreeDisplay;
      }
      if (
        remainingSlots[shift.id].F >= 0 &&
        remainingSlots[shift.id].F === maxFreeGirlSlots
      ) {
        remainingSlots[shift.id].F = shift.girlSlots;
      } else if (remainingSlots[shift.id].F > shift.maxFreeDisplay) {
        remainingSlots[shift.id].F = shift.maxFreeDisplay;
      }
    });

    return {
      available: true,
      shifts,
      remainingSlots
    };
  } catch (err) {
    console.error("Could not load shift info from the database:", err);
    return { available: false, shifts: [], remainingSlots: {} };
  }
};
