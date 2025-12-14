interface MetaTitle {
  title: string;
}

interface MetaDescription {
  name: "description";
  content: string;
}

export type MetaBasicInfo = [MetaTitle, MetaDescription];

class MetaConstants {
  static NOT_FOUND: MetaBasicInfo = [
    { title: "404 – Kaardistamata ala | Merelaager" },
    {
      name: "description",
      content: "Kaardistamata ala."
    }
  ];

  static LANDING: MetaBasicInfo = [
    { title: "Laoküla merelaager | Merekogemuse andmine noortele" },
    {
      name: "description",
      content:
        "Laoküla merelaager on suurepärane võimalus 8-16aastastel merehuvilistel veeta suvi looduskaunis kohas mere kaldal. Ka algajad võivad 12 päeva jooksul selgeks saada nii purjetamise, sõudmise kui ka muude meresõiduvahendite kasutamise algtõed."
    }
  ];

  static INFO: MetaBasicInfo = [
    { title: "Info | Merelaager" },
    {
      name: "description",
      content: "Erinevad ressursid nii laagrilisele kui ka lapsevanemale."
    }
  ];

  static INFO_VAHETUSED: MetaBasicInfo = [
    { title: "Laagrivahetuste ajad ja broneerimine | Merelaager" },
    {
      name: "description",
      content:
        "Vahetuste kuupäevad, juhatajate kontaktandmed ja info broneerimise kohta."
    }
  ];

  static INFO_MAKSMINE: MetaBasicInfo = [
    { title: "Hinnad ja maksmine | Merelaager" },
    {
      name: "description",
      content: "Laagrivahetuste hinnad ja makseinfo."
    }
  ];

  static INFO_ELU_LAAGRIS: MetaBasicInfo = [
    { title: "Elu laagris | Merelaager" },
    {
      name: "description",
      content: "Laagri asukoht, kodukord ja päevakava."
    }
  ];

  static INFO_KKK: MetaBasicInfo = [
    { title: "Korduma kippuvad küsimused | Merelaager" },
    {
      name: "description",
      content: "Korduma kippuvad küsimused."
    }
  ];

  static REGISTREERIMINE: MetaBasicInfo = [
    { title: "Laagrikoha broneerimine | Merelaager" },
    {
      name: "description",
      content: "Laagrikoha broneerimine."
    }
  ];

  static PILDID: MetaBasicInfo = [
    { title: "Pildid | Merelaager" },
    {
      name: "description",
      content: "Vanad ajad, head mälestused, rõõmsad lapsed."
    }
  ];

  static AJALUGU: MetaBasicInfo = [
    { title: "Merelaagri aja lugu" },
    {
      name: "description",
      content:
        "Mis koht see Noorte Mereklubi on? Mereleksikon ütleb: merendushuvilisi noori ühendav lasteklubi, asutatud 1972. a."
    }
  ];

  static MEESKOND: MetaBasicInfo = [
    { title: "Meeskond | Merelaager" },
    {
      name: "description",
      content:
        "Merelaagri vahetuste juhatajad, tänu kellele on merelaager tegutsenud juba üle 25. aasta."
    }
  ];

  static KASUTAJATINGIMUSED: MetaBasicInfo = [
    { title: "Veebilehe kasutajatingimused | Merelaager" },
    {
      name: "description",
      content: "Veebilehe kasutajatingimused."
    }
  ];

  static ISIKUANDMED: MetaBasicInfo = [
    { title: "Isikuandmete töötlemine | Merelaager" },
    {
      name: "description",
      content: "Isikuandmete töötlemine."
    }
  ];

  static COOKIES: MetaBasicInfo = [
    { title: "Küpsiste kasutamine | Merelaager" },
    {
      name: "description",
      content: "Küpsiste kasutamine veebilehel."
    }
  ];
}

export default MetaConstants;
