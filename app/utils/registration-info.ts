import { prisma } from "~/db.server";

export const getRegistrationInfo = async (registrationId: string) => {
  return prisma.registration.findMany({
    where: { regId: registrationId },
    select: {
      child: { select: { name: true } },
      shiftNr: true,
      contactEmail: true,
    },
  });
};
