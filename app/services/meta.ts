import flatten from "flat";
import { IntlProvider } from "react-intl";
import { ASSETS_LOCATION } from "~/constants/assets-location";
import { WEBSITE_URL } from "~/constants/sitemap";
import type { MetaFunctionFactory } from "~/types/meta";
import messages from "../../public/assets/i18n/en.json";

const {
  state: { intl },
} = new IntlProvider({
  locale: "en",
  messages: flatten(messages),
});

export const metaFunctionFactory: MetaFunctionFactory =
  (
    {
      locationKey,
      descriptionKey = "navigation.aboutMe.description",
      location,
      description,
      url,
      imageUrl,
    }: {
      locationKey?: string;
      descriptionKey?: string;
      location?: string;
      description?: string;
      url?: string;
      imageUrl?: string;
    } = { url: WEBSITE_URL }
  ) =>
  () => {
    location =
      location ?? (locationKey ? intl?.formatMessage({ id: locationKey }) : "");
    description = description ?? intl?.formatMessage({ id: descriptionKey });
    url = url ?? WEBSITE_URL;

    const title = `${location ? `${location} | ` : ""}Lars Schieffer`;

    return [
      {
        name: "description",
        content: description,
      },
      {
        title,
      },
      { property: "og:title", content: title },
      {
        property: "og:image",
        content: imageUrl ?? `${ASSETS_LOCATION}portrait.webp`,
      },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
    ];
  };
