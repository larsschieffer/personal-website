import { Form, useLocation } from "@remix-run/react";
import { FormattedMessage, useIntl } from "react-intl";
import { ASSETS_LOCATION } from "~/constants/assets-location";
import type { ErrorPageProps } from "~/types/error";
import BoxRounded from "../box/box-rounded";

export const ErrorPage = ({
  imageAltTextId,
  imagePath,
  descriptionTextId,
  buttonTextId,
}: ErrorPageProps): JSX.Element => {
  const intl = useIntl();
  const { pathname } = useLocation();

  return (
    <BoxRounded className="bg-white/90 h-full w-full max-h-[80vh] sm:h-2/3  p-4 sm:p-8 max-w-[1170px]">
      <Form method="post" action="/error" className="inline">
        <input
          className="hidden"
          type="text"
          name="location"
          value={pathname}
          readOnly
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[3fr_2fr] sm:grid-rows-[3fr_1fr] md:grid-rows-2 justify-content-center h-full md:gap-10">
          <img
            alt={intl.formatMessage({ id: imageAltTextId })}
            src={`${ASSETS_LOCATION}${imagePath}`}
            className="object-contain h-[25vh] md:h-[50vh] justify-self-center pt-4 sm:col-span-2 md:col-span-1 md:row-span-2 md:self-center"
          ></img>
          <h1 className="text-3xl whitespace-pre-line self-center md:self-end">
            <FormattedMessage
              id={descriptionTextId}
              values={{
                strong: (chunks: React.ReactNode[]) => (
                  <strong>{chunks}</strong>
                ),
              }}
            ></FormattedMessage>
          </h1>
          <button
            type="submit"
            className="sm:place-self-center sm:mb-0 sm:w-fit rounded-xl bg-accent-ternary px-8 py-4 font-bold text-white w-full self-end md:self-start"
          >
            <FormattedMessage id={buttonTextId}></FormattedMessage>
          </button>
        </div>
      </Form>
    </BoxRounded>
  );
};
