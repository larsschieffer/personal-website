import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, V2_MetaFunction } from "@vercel/remix";
import flatten from "flat";
import { IntlProvider } from "react-intl";
import toastify from "react-toastify/dist/ReactToastify.css";
import fonts from "~/styles/fonts.css";
import styles from "~/styles/styles.css";
import tailwind from "~/styles/tailwind.css";
import messages from "../public/assets/i18n/en.json";
import Toast from "./components/toast";
import { metaFunctionFactory } from "./utils/meta";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fonts },
  { rel: "stylesheet", href: toastify },
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: styles },
];

export const meta: V2_MetaFunction = metaFunctionFactory();

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-archivo text-gray-dark md:overflow-visible">
        <IntlProvider
          messages={flatten(messages)}
          locale="en"
          defaultLocale="en"
        >
          <Outlet />
          <Toast />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </IntlProvider>
      </body>
    </html>
  );
}
