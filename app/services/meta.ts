import flatten from "flat";
import { IntlProvider } from "react-intl";
import type { MetaFunctionFactory } from "~/types/meta";
import messages from "../../public/assets/i18n/en.json";

const {
  state: { intl },
} = new IntlProvider({
  locale: "en",
  messages: flatten(messages),
});

export const metaFunctionFactory: MetaFunctionFactory =
  ({
    locationKey,
    descriptionKey = "navigation.aboutMe.description",
    location,
    description,
  }: {
    locationKey?: string;
    descriptionKey?: string;
    location?: string;
    description?: string;
  } = {}) =>
  () => {
    location =
      location ?? (locationKey ? intl?.formatMessage({ id: locationKey }) : "");
    description = description ?? intl?.formatMessage({ id: descriptionKey });

    return [
      {
        name: "description",
        content: description,
      },
      {
        title: `Lars Schieffer${location ? ` | ${location}` : ""}`,
      },
    ];
  };
