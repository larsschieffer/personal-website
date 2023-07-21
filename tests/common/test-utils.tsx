import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import messages from "../../public/assets/i18n/en.json";
import { flatten } from "flat";

const wrappedRender = (
  children: React.ReactElement,
): ReturnType<typeof render> => {
  return render(
    <IntlProvider locale="en" defaultLocale="en" messages={flatten(messages)}>
      {children}
    </IntlProvider>,
  );
};

export * from "@testing-library/react";
export { wrappedRender as render };
