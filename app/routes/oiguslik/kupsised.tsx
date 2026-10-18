import type { MetaDescriptor, MetaFunction } from "react-router";
import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

export const meta: MetaFunction = () => {
  return genMetaData(MetaConstants.COOKIES, "/oiguslik/kupsised") as MetaDescriptor[];
};

export default function CookiesLegalRoute() {
  return (
    <main>
      <section className="c-section c-section--legal">
        <div className="o-container">
          <h3 className="c-section-heading">Küpsiste kasutamine</h3>
          <p>Hetkel ei kasuta me veebilehel küpsiseid ega Web Storageit.</p>
        </div>
      </section>
    </main>
  );
}
