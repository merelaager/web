import {
  Link,
  MetaDescriptor,
  MetaFunction,
  useLoaderData,
} from "react-router";
import { Route } from "../../../.react-router/types/app/+types/root";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";
import { getRegistrationInfo } from "~/utils/registration-info";
import React from "react";
import LoaderArgs = Route.LoaderArgs;

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.REGISTREERIMINE,
    "/broneering",
  ) as MetaDescriptor[];
};

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.regId)
    return { registrationId: params.regId, registrations: [], email: null };

  const registrations = await getRegistrationInfo(params.regId);
  const flattened = registrations.map((registration) => {
    return { shiftNr: registration.shiftNr, name: registration.child.name };
  });

  const email =
    registrations.length >= 1 ? registrations[0].contactEmail : null;
  return { registrationId: params.regId, registrations: flattened, email };
};

export default function Route() {
  const { registrationId, registrations, email } =
    useLoaderData<typeof loader>();

  if (!registrations || registrations.length === 0) {
    return (
      <main>
        <section className="c-section">
          <div className="o-container">
            <h3 className="c-section-heading">Broneeringu info</h3>
            <p>{`Broneeringu kood: ${registrationId}`}</p>
            <p>Broneeringut ei leitud või selle kuvamine on aegunud!</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="successpage">
      <section className="c-section">
        <div className="o-container">
          <h3>
            Oleme lapse{registrations.length > 1 ? "d" : null} lisanud
            reservnimekirja
          </h3>
          <p>
            Saatsime Teie meilile teate registreerimise lisainfo ja
            reservnimekirja kandmise kohta.
          </p>
          <p>
            Kui Te pole kümne minuti jooksul meilile teadet saanud, siis palun
            helistage või kirjutage vahetuse juhatajale. Soovitame vaadata ka
            rämpsposti.
          </p>
          <div className="c-bookings">
            <p>Broneeringu info:</p>
            <ul>
              {registrations.map((registration) => (
                <li key={registration.name}>
                  {registration.name} ({registration.shiftNr}. vahetus)
                </li>
              ))}
            </ul>
            <p>{`Kontaktmeil: ${email}`}</p>
          </div>
          <Link to="/" className="c-btn c-btn--white">
            Tagasi kodulehele
          </Link>
        </div>
      </section>
    </div>
  );
}
