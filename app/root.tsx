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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fonts },
  { rel: "stylesheet", href: toastify },
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: styles },
];

export const meta: V2_MetaFunction = () => [
  { title: "Lars Schieffer" },
  { charSet: "utf-8" },
  {
    name: "viewport",
    content: "width=device-width,initial-scale=1",
  },
  {
    name: "description",
    content:
      "My personal website to show my experience as a Software Developer",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-archivo text-gray-dark">
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
