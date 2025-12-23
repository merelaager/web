import type { MetaDescriptor, MetaFunction } from "react-router";
import { genMetaData } from "~/utils/metagen";
import MetaConstants from "~/utils/meta-constants";

export const meta: MetaFunction = () => {
  return genMetaData(
    MetaConstants.ISIKUANDMED,
    "/isikuandmed"
  ) as MetaDescriptor[];
};

export default function PIILegalRoute() {
  return (
    <main>
      <section className="c-section c-section--legal">
        <div className="o-container">
          <h3 className="c-section-heading">Isikuandmete töötlemine</h3>
          <p>Viimati täiendatud: 23. detsember 2025</p>
          <h4>
            Mida me peame <q>isikuandmeteks</q>?
          </h4>
          <p>
            Meie jaoks on <q>isikuandmed</q> teave (nt nimi või isikukood),
            mille abil tuvastame isiku (nt lapsevanema või laagrilapse).
          </p>
          <p>
            Kogu teave, mida isikuandmed ei hõlma, on{" "}
            <q>isikuga mitteseotud andmed</q>.
          </p>
          <p>
            Kui talletame isikuandmeid koos andmetega, mis ei ole isikuandmed,
            käsitleme seda andmekombinatsiooni isikuandmetena. Kui eemaldame
            andmekogumist isikuandmed, ei pruugi me eemaldada isikuga
            mitteseotud andmete osa.
          </p>
          <h4>Milliseid isikuandmeid me töötleme?</h4>
          <p>Töötleme kolme tüüpi isikuandmeid.</p>
          <ul>
            <li><em>Üldandmed</em> on ees- ja perekonnanimi, sugu, isikukood ja sünniaeg.</li>
            <li><em>Kontaktandmed</em> on telefoninumber, e-posti aadress ja elukoha aadress.</li>
            <li><em>Terviseandmed</em> on andmed lapse tervisliku seisundi kohta (nt allergiad, menüü piirangud).</li>
          </ul>
          <h4>Mida teeme teie andmetega?</h4>
          <p>
            Kui edastate meile oma andmed, kasutame neid vaid viisidel, mis
            ühtivad käesoleva privaatsuspoliitikaga. Peamine otstarve on
            laagrilastest ja nende kontaktisikutest ülevaate saamine ning
            noorsootöö ja laagriseadusega kooskõla tagamine.
          </p>
          <p>
            Andmed, mida vajame statistikaks (nt vanus või päritolumaakond),
            anonüümime enne kasutamist.
          </p>
          <h4>Kui kaua säilitame teie andmeid?</h4>
          {/*<p>
            Me ei soovi hoida teie isikuandmeid kauem, kui meil neid vaja on,
            seega säilitame neid vaid senikaua, kuni oleme täitnud eesmärgi,
            mille jaoks neid andmeid kogusime. Kui meil pole teie andmeid enam
            tarvis, siis eemaldame need laagri andmekogumist.
          </p>
          <InfoBanner>
            Osa andmeid, näiteks lapse nimi ja merelaagris käidud aastate arv,
            säilitame laagri arhiivi tarbeks.
          </InfoBanner>*/}
          <p>
            Säilitame isikuandmeid, kuniks oleme täitnud eesmärgi, mille jaoks neid andmeid kogusime.
            Andmete säilitusaja alguseks loeme viimase hetke, millal andmed on meile laekunud.
            Andmete taasesitamise puhul hakkab säilitamise aeg seega uuesti nullist jooksma.
          </p>
          <p>
            Tervise- ja kontaktandmed kustutame hiljemalt 3 kuud peale laagrisuve lõppu.
            Erandiks on lapsevanema e-posti aadress, mille säilitame broneerimissüsteemis kuni järgmise laagrisse
            registreerimise perioodi alguseni, ent mitte kauem kui üks aasta.
            Säilitame seda selleks, et jagada infot järgmise registreerimise alguse kohta.
          </p>
          <p>
            Lapsevanema üldandmed kustutame samuti hiljemalt 3 kuud peale laagrisuve lõppu.
            Lapse üldandmete säilitamise puhul on loogika keerulisem.
          </p>
          <ul>
            <li>Lapse isikukoodi ja/või sünniaega talletame kuni lapse 18. eluaasta aasta lõpuni.</li>
            <li>Lapse nime ja sünniaastat talletame tähtajatult (kuni nõusoleku tagasivõtmiseni) laagri arhiivi tarbeks.</li>
          </ul>
          <p>Säilitame isikukoodi ja/või sünniaega kuni 18. eluaastani selleks, et tuvastada registreerimisel
            lapse isikusamasust.
            See on vajalik näiteks selleks, et kontrollida, et laps ei ole saanud laagrikeeldu või et laps on
            tõepoolest laagris varem käinud (millest sõltub laagrikoha hind).
            Lapse nimest meile selleks ei piisa, kuna mitmel lapsel võib olla sama nimi ja vahel võib juhtuda, et sama
            laps registreeritakse erineva nimega (nt näpukas, nimevahetus, keskmise nime lisamine).
          </p>
          <p>
            Kuna me täisealisi lapsi laagrisse vastu ei võta, kaob lapse täisealiseks saamisega meil vajadus lapse isik
            kindlaks määrata.
          </p>
          {/*<p>
            Nõusoleku laagris käinud lapse nime arhiivist eemaldamiseks saab tagasi võtta vaid laps ise pärast 18.
            aastaseks saamist.
            Enne seda säilitame nime samuti isikusamasuse tuvastamise põhjusel.
          </p>*/}
          <h4>Millal jagame teie andmeid teistega?</h4>
          <p>
            Teie usaldus on meie jaoks tähtis, seega jagame teie andmeid vaid
            järgnevatel põhjustel:
          </p>
          <ul>
            <li>
              Jagame andmeid organisatsiooni sees ja sel juhul vaid neid, mis on
              vajalikud (nt juhatajad omavahel või noorsootööasutustele
              aruannete kirjutamisel).
            </li>
            <li>
              Jagame andmeid, kui seadused seda kohustavad. Kui saame mõnelt
              riigiasutuselt teiega seotud päringu või kui päring on seotud
              kohtuprotsessiga, järgime alati seadusi. Sellistel juhtudel anname
              sellest teile või lapse kontaktisikule teada, kui see pole
              seadusega keelatud.
            </li>
            <li>
              Jagame andmeid, kui usume, et seda on vaja teie või kellegi teise
              kahjustamise vältimiseks (nt meditsiinilise erikorra puhul). Neil
              puhkudel anname sellest kas teile või lapse kontaktisikule teada.
            </li>
          </ul>
          <h4>Kuidas talletame ja kaitseme teie isikuandmeid?</h4>
          <p>
            Meie jaoks on väga oluline teilt saadud isikuandmete kaitsmine ja
            rakendame selle tagamiseks nii organisatsioonilisi kui ka tehnilisi
            turbemeetmeid. Lähtume teadmisvajaduse põhimõttest. Teisisõnu
            pääsevad teie andmetele ligi vaid need, kellel on andmete vajamiseks
            mõjuv põhjus (nt vahetuse juhataja) ja kes teevad seda vaid otstarbe
            alusel.
          </p>
          <p>
            Kui vaatamata meie pingutustele ilmneb mõni turbemeetme rikkumine,
            anname teile sellest teada ja teeme kõik endast oleneva, et olukorda
            parandada.
          </p>
          <p>
            Merelaagri serverit ja andmebaasi majutab Zone Media OÜ.
            Nende isikuandmete kaitse tingimustega saate tutvuda <a
            href="https://www.zone.ee/et/lepingud/isikuandmete-kaitse-gdpr-2/" className="t-visible"
            target="_blank">siin</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
