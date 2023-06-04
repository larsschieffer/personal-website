import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, V2_MetaFunction } from "@vercel/remix";
import flatten from "flat";
import { IntlProvider } from "react-intl";
import toastify from "react-toastify/dist/ReactToastify.css";
import fonts from "~/styles/fonts.css";
import tailwind from "~/styles/tailwind.css";
import messages from "../public/assets/i18n/en.json";
import { ErrorPageDefault } from "./components/error-page/error-page-default";
import { ErrorPageNotFound } from "./components/error-page/error-page-something-went-wrong";
import { Toast } from "./components/toast";
import { metaFunctionFactory } from "./services/meta";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fonts },
  { rel: "stylesheet", href: toastify },
  { rel: "stylesheet", href: tailwind },
];
export const meta: V2_MetaFunction = metaFunctionFactory();

export const App = (): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-light bg-body bg-no-repeat font-inter text-gray-dark md:overflow-visible">
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
};

export const ErrorBoundary = (): JSX.Element => {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-light bg-body bg-no-repeat font-inter text-gray-dark">
        <IntlProvider
          messages={flatten(messages)}
          locale="en"
          defaultLocale="en"
        >
          <div className="max-w-screen grid h-screen max-h-screen w-screen place-items-center px-8 py-16">
            {isRouteError ? <ErrorPageNotFound /> : <ErrorPageDefault />}
          </div>
          <Toast />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </IntlProvider>
      </body>
    </html>
  );
};

export default App;
