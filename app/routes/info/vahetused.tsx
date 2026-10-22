import type { MetaDescriptor, MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import type { ReactElement } from "react";
import { Fragment } from "react";

import Email from "~/components/email";
import { InfoBanner, WarningBanner } from "~/components/banners";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

import { YEAR } from "~/hcdb";
import { getShiftDateSpan, ShiftDateInfo } from "~/utils/shift-dates";
import { getFreeSlots } from "~/utils/slots";

interface ShiftInfo extends ShiftDateInfo {
  shiftNr: number;
  bossName: string;
  bossUsername: string;
  bossPhone: string;
}

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.INFO_VAHETUSED,
    "/info/vahetused"
  ) as MetaDescriptor[];
};

interface InfoCardProps {
  shiftInfo: ShiftInfo;
  remainingSlots: { M: number; F: number };
}

const InfoCard = ({ shiftInfo, remainingSlots }: InfoCardProps) => {
  const numerals = ["I", "II", "III", "IV", "V"];

  return (
    <div className="c-shift-card">
      <div className="c-details__header">
        {numerals[shiftInfo.shiftNr - 1]} vahetus
        <span className="u-wave" />
        {getShiftDateSpan(shiftInfo)}
        <span className="u-wave" />
        {shiftInfo.length} päeva
      </div>
      <div className="c-details__body">
        <div className="details-contact">
          <p>
            <b>{shiftInfo.bossName}</b>
          </p>
          <p>
            <Email username={shiftInfo.bossUsername} />
          </p>
          <p>{shiftInfo.bossPhone}</p>
        </div>
        <div className="details-slots">
          <p>
            <b>Vabad kohad:</b>
          </p>
          <div className="slots">
            <div>Poisid: {remainingSlots.M < 0 ? 0 : remainingSlots.M}</div>
            <div>Tüdrukud: {remainingSlots.F < 0 ? 0 : remainingSlots.F}</div>
          </div>
        </div>
      </div>
      {/*<div class="contact__free"><div class="count">-</div></div>*/}
    </div>
  );
};

interface ShiftInfoProps {
  shifts: ShiftInfo[];
  remainingSlots: { [i: number]: { M: number; F: number } };
}

const ShiftInfoComponent = ({ shifts, remainingSlots }: ShiftInfoProps) => {
  const infoCards = shifts.map((shift) => (
    <InfoCard
      key={shift.shiftNr}
      shiftInfo={shift}
      remainingSlots={remainingSlots[shift.shiftNr]}
    />
  ));
  return (
    <Fragment>
      <div className="c-details o-grid">{infoCards}</div>
      <InfoBanner>
        Vabade kohtade puudumisel soovitame registreeruda reservnimekirja. Kui
        põhinimekirjas koht vabaneb, võtame teiega esimesel võimalusel ühendust.
      </InfoBanner>
    </Fragment>
  );
};

type ActiveDay = {
  startDay: number;
  endDay: number;
  isLight: boolean;
  isTrueStart: boolean;
};

interface CalendarMonthProps {
  monthIndex: number;
  activeDays: ActiveDay[];
}

const CalendarMonth = ({ monthIndex, activeDays }: CalendarMonthProps) => {
  const monthDate = new Date(YEAR, monthIndex, 1);
  const monthName = monthDate.toLocaleDateString("et", {
    month: "long"
  });

  // Get the number of days in a month.
  const daysInMonth = new Date(YEAR, monthIndex + 1, 0).getDate();

  // Get the weekday index of the first day in the month.
  const firstDayOfMonth = monthDate.getDay();
  // If the first day of the week is a Sunday, pad with 6 empty slots.
  // Otherwise, pad with the number of slots for the index of the day of the
  // week.
  const underflowDays = (firstDayOfMonth || 7) - 1;

  const underflowDayEls: ReactElement[] = [];
  for (let i = 0; i < underflowDays; ++i) {
    underflowDayEls.push(<div key={i} />);
  }

  let cssClass = "";
  let spanDaysRemaining = 0;

  const dayEls: ReactElement[] = [];
  for (let i = 1; i <= daysInMonth; ++i) {
    if (spanDaysRemaining === 0) cssClass = "not";
    else spanDaysRemaining -= 1;

    const el = activeDays.find((el) => el.startDay === i);

    if (el !== undefined) {
      cssClass = el.isLight ? "lite" : "";
      spanDaysRemaining = el.endDay - el.startDay;

      if (el.isTrueStart) {
        dayEls.push(
          <div key={i} className={cssClass + " start"}>
            {i}
          </div>
        );
        continue;
      }
    }

    dayEls.push(
      <div key={i} className={cssClass}>
        {i}
      </div>
    );
  }

  return (
    <div className="month">
      <h4 className="month__name">{monthName}</h4>
      <div className="month__calendar">
        <div>E</div>
        <div>T</div>
        <div>K</div>
        <div>N</div>
        <div>R</div>
        <div>L</div>
        <div>P</div>
        {underflowDayEls}
        {dayEls}
      </div>
    </div>
  );
};

interface CalendarComponentProps {
  shifts: ShiftInfo[];
}

const CalendarsComponent = ({ shifts }: CalendarComponentProps) => {
  // TODO: improve the logic.
  const activeMonths: { [property: string]: ActiveDay[] } = {};
  for (const [i, shift] of shifts.entries()) {
    const isLight = i % 2 === 0;
    const shiftStartDate = shift.startDate;
    const shiftEndDate = new Date(
      shiftStartDate.getFullYear(),
      shiftStartDate.getMonth(),
      shiftStartDate.getDate() + shift.length
    );

    const shiftStartMonth = shiftStartDate.getMonth();
    const shiftEndMonth = shiftEndDate.getMonth();

    if (!(shiftStartMonth in activeMonths)) {
      activeMonths[shiftStartMonth] = [];
    }

    let endDay = shiftEndDate.getDate() - 1;

    // If the shift spans two months, mark all the remaining days of
    // the month as active, and carry over the rest to the next month.
    if (shiftStartDate.getUTCMonth() !== shiftEndDate.getUTCMonth()) {
      if (!(shiftEndMonth in activeMonths)) {
        activeMonths[shiftEndMonth] = [];
      }

      // The cary starts from the first day of the second month.
      activeMonths[shiftEndMonth].push({
        startDay: 1,
        endDay: endDay,
        isLight: isLight,
        isTrueStart: false
      });

      // The end day for the first month is the last day of the month.
      endDay = new Date(
        shiftStartDate.getFullYear(),
        shiftStartDate.getMonth() + 1,
        0
      ).getDate();
    }

    activeMonths[shiftStartMonth].push({
      startDay: shiftStartDate.getDate(),
      endDay: endDay,
      isLight: isLight,
      isTrueStart: true
    });
  }

  const calendarMonths = Object.keys(activeMonths)
    .sort()
    .map((el) => (
      <CalendarMonth
        key={el}
        monthIndex={parseInt(el, 10)}
        activeDays={activeMonths[el]}
      />
    ));

  return (
    <Fragment>
      <div className="c-schedule">{calendarMonths}</div>
    </Fragment>
  );
};

const RegistrationSection = () => {
  return (
    <section className="c-section" id="broneerimine">
      <div className="o-container">
        <h3 className="c-section-heading">Broneerimine</h3>
        <b className="u-orange">TÄHELEPANU!</b>
        {/*<p>01.01.22. kell 14.00 avaneb siin registreerimisportaal.</p>*/}
        <p>
          Laagrisse registreerimine toimub ainult läbi kodulehe. Kui
          registreerija on ankeedi täitnud, saab ta oma kontaktmeilile arve
          laagri osalustasu maksmiseks.
        </p>
        <Link to="/registreerimine/" className="c-btn u-text-center u-mt-1em">
          Registreerimisportaal
        </Link>
        <p className="u-mt-1em">
          Makseinfo leiate{" "}
          <Link to="/info/maksmine/#makseinfo" className="t-visible">
            siit
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export const loader = async () => {
  const { available, shifts, remainingSlots } = await getFreeSlots();

  return { available, shifts, remainingSlots };
};

const ShiftDatesSection = () => {
  const { available, shifts, remainingSlots } = useLoaderData<typeof loader>();

  if (!available || shifts.length === 0) {
    return (
      <section className="c-section" id="ajad">
        <div className="o-container">
          <h3 className="c-section-heading">Laagrivahetuste ajad</h3>
          <WarningBanner>
            Vahetuste info ei ole hetkel saadaval. Palun proovige mõne aja
            pärast uuesti.
          </WarningBanner>
        </div>
      </section>
    );
  }

  const mappedShifts: ShiftInfo[] = [];
  shifts.forEach((shift) => {
    mappedShifts.push({
      shiftNr: shift.id,
      bossName: shift.bossName,
      bossUsername: shift.bossEmail.split("@")[0],
      bossPhone: shift.bossPhone,
      length: shift.length,
      startDate: shift.startDate
    });
  });

  const shiftYear = mappedShifts[0].startDate.getUTCFullYear();

  return (
    <section className="c-section" id="ajad">
      <div className="o-container">
        <h3 className="c-section-heading">{shiftYear} Laagrivahetuste ajad</h3>
        <CalendarsComponent shifts={mappedShifts} />
        <ShiftInfoComponent
          shifts={mappedShifts}
          remainingSlots={remainingSlots}
        />
      </div>
    </section>
  );
};

export default function ShiftInfoRoute() {
  return (
    <main>
      <ShiftDatesSection />
      <RegistrationSection />
    </main>
  );
}
