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
    <BoxRounded className="h-full max-h-[80vh] w-full max-w-[1170px] bg-white/90  p-4 sm:h-2/3 sm:p-8">
      <Form method="post" action="/error" className="inline">
        <input
          className="hidden"
          type="text"
          name="location"
          value={pathname}
          readOnly
        />
        <div className="justify-content-center grid h-full grid-cols-1 sm:grid-cols-2 sm:grid-rows-[3fr_1fr] md:grid-cols-[3fr_2fr] md:grid-rows-2 md:gap-10">
          <img
            alt={intl.formatMessage({ id: imageAltTextId })}
            src={`${ASSETS_LOCATION}${imagePath}`}
            className="h-[25vh] justify-self-center object-contain pt-4 sm:col-span-2 md:col-span-1 md:row-span-2 md:h-[50vh] md:self-center"
          ></img>
          <h1 className="self-center whitespace-pre-line text-3xl md:self-end">
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
            className="w-full self-end rounded-xl bg-accent-ternary px-8 py-4 font-bold text-white sm:mb-0 sm:w-fit sm:place-self-center md:self-start"
          >
            <FormattedMessage id={buttonTextId}></FormattedMessage>
          </button>
        </div>
      </Form>
    </BoxRounded>
  );
};
