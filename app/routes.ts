import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig
} from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("registreermine/edu", "routes/registreerimine/edu.tsx"),
  layout("routes/broneering/_layout.tsx", [
    route("broneering/:regId", "routes/broneering/route.tsx")
  ]),
  layout("routes/_app.tsx", [
    route("ajalugu", "routes/ajalugu.tsx"),
    route("meeskond", "routes/meeskond.tsx"),
    route("pildid", "routes/pildid.tsx"),
    route("registreerimine", "routes/registreerimine/route.tsx"),
    ...prefix("info", [
      index("routes/info/info.tsx"),
      route("kkk", "routes/info/kkk.tsx"),
      route("laagrist", "routes/info/laagrist.tsx"),
      route("maksmine", "routes/info/maksmine.tsx"),
      route("vahetused", "routes/info/vahetused.tsx")
    ]),
    ...prefix("oiguslik", [
      index("routes/oiguslik/oiguslik.tsx"),
      route("isikuandmed", "routes/oiguslik/isikuandmed.tsx"),
      route("kasutajatingimused", "routes/oiguslik/kasutajatingimused.tsx"),
      route("kupsised", "routes/oiguslik/kupsised.tsx")
    ])
  ])
] satisfies RouteConfig;
