import { Link } from "@remix-run/react";
import { FormattedMessage, useIntl } from "react-intl";
import { ASSETS_LOCATION } from "~/constants/assets-location";

export const ErrorNotFound = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="flex flex-col md:flex-row justify-center md:items-center gap-6 ">
      <img
        alt={intl.formatMessage({ id: "error.404.imageDescription" })}
        src={`${ASSETS_LOCATION}404.svg`}
        className="h-48 md:h-auto md:w-[60vw] md:max-h-[66.6vh] object-contain"
      ></img>
      <div className="flex flex-col gap-8 w-fit flex-1">
        <h1 className="text-3xl whitespace-pre-line">
          <FormattedMessage
            id="error.404.message"
            values={{
              strong: (chunks: React.ReactNode[]) => <strong>{chunks}</strong>,
            }}
          ></FormattedMessage>
        </h1>
        <Link
          className="self-center md:self-start rounded-xl bg-accent-ternary px-8 py-4 font-bold text-white w-fit"
          to="/"
        >
          <FormattedMessage id="error.404.button"></FormattedMessage>
        </Link>
      </div>
    </div>
  );
};
