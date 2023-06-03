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
import { ErrorNotFound } from "./components/error/error-not-fount";
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
      <body className="font-inter text-gray-dark md:overflow-visible bg-body bg-gray-light bg-no-repeat">
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
      <body className="font-inter text-gray-dark bg-gray-light  ">
        <IntlProvider
          messages={flatten(messages)}
          locale="en"
          defaultLocale="en"
        >
          <div className="w-screen h-screen max-h-screen max-w-screen grid place-items-center p-8">
            {isRouteError ? <ErrorNotFound /> : <ErrorNotFound />}
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
