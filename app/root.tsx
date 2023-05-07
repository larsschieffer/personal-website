import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import toastify from "react-toastify/dist/ReactToastify.css";
import fonts from "~/styles/fonts.css";
import styles from "~/styles/styles.css";
import tailwind from "~/styles/tailwind.css";
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
];

export default function App() {
  return (
    <html lang="de">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-archivo text-gray-dark">
        <Outlet />
        <Toast />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
