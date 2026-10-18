import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type {Route} from "./+types/root";
import stylesheet from "./global.css?url";

export const links: Route.LinksFunction = () => [
  {rel: "preconnect", href: "https://fonts.googleapis.com"},
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;800&display=swap",
  },
  {rel: "stylesheet", href: stylesheet},
];

export function Layout({children}: { children: React.ReactNode }) {
  return (
    <html lang="et">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    {children}
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet/>;
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  return (
    <main className="errorpage">
      <section className="site-error">
        <h3 className="">404 – kaardistamata ala</h3>
        <p>Asute tundmatutes vetes.</p>
        <Link to="/" className="c-btn c-btn--white">
          Tagasi rannikule
        </Link>
      </section>
    </main>
  );
}
