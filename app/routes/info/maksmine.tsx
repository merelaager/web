import type { MetaDescriptor, MetaFunction } from "react-router";

import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";
import { InfoBanner } from "~/components/banners";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.INFO_MAKSMINE,
    "/info/maksmine"
  ) as MetaDescriptor[];
};

const PriceInfo = () => {
  return (
    <section className="c-section" id="maksumus">
      <div className="o-container">
        <h3 className="c-section-heading">Laagrikoha maksumus</h3>
        <div className="">
          <div className="c-payment-block">
            <h4 className="c-payment-block__title">12päevane vahetus</h4>
            <ul className="c-payment-block__content">
              <li>uuele tulijale: 360 €</li>
              <li>vanale olijale: 340 €</li>
            </ul>
          </div>
          <div className="c-payment-block">
            <h4 className="c-payment-block__title">9päevane vahetus</h4>
            <ul className="c-payment-block__content">
              <li>uuele tulijale: 290 €</li>
              <li>vanale olijale: 280 €</li>
            </ul>
          </div>
          <div className="c-payment-block">
            <h4 className="c-payment-block__title">Broneerimistasu</h4>
            <ul className="c-payment-block__content">
              <li>Kõigile 100 €</li>
            </ul>
          </div>
        </div>
        <InfoBanner>
          <strong>Laagrikoha broneerimise tasu kuulub hinna sisse!</strong>{" "}
          Ülejäänud osa peab olema tasutud üks kuu enne laagrivahetuse algust,
          vastasel juhul anname koha järgmisele soovijale. Laagrikohast
          loobumisel tagastame broneerimistasu vaid siis, kui leiame
          asendusliikme.
        </InfoBanner>
      </div>
    </section>
  );
};

const PaymentInfo = () => {
  return (
    <section className="c-section" id="makseinfo">
      <div className="o-container">
        <h3 className="c-section-heading">Makseinfo</h3>
        <p>
          MTÜ Noorte Mereklubi (Reg. Nr. 80067875)
          <br />
          Konto: EE862200221011493003
          <br />
          SWIFT kood/BIC:HABAEE2X
          <br />
          SWEDBANK
        </p>
        <strong>Kindlasti märkige selgitusse lapse nimi ja vahetus!</strong>
      </div>
    </section>
  );
};

export default function PaymentInfoRoute() {
  return (
    <main>
      <PriceInfo />
      <PaymentInfo />
    </main>
  );
}
