import type { MetaFunction } from "@vercel/remix";
import { FormattedMessage } from "react-intl";
import { BoxRounded } from "~/components/box/box-rounded";
import { WEBSITE_URL } from "~/constants/sitemap";
import { metaFunctionFactory } from "~/services/meta";

export const meta: MetaFunction = metaFunctionFactory({
  locationKey: "imprint.title",
  url: `${WEBSITE_URL}imprint`,
});

export const Imprint = (): JSX.Element => {
  return (
    <div className="mx-6 grid h-screen place-items-center">
      <BoxRounded>
        <div className="flex flex-col content-center gap-8 bg-white p-8">
          <div>
            <h1 className="font-semibold">
              <FormattedMessage id="imprint.contact" />:
            </h1>
            <p>
              Lars Schieffer <br />
              Franz-Marc-Weg 2 <br />
              66564 Ottweiler <br />
              Email: <FormattedMessage id="contact.email"></FormattedMessage>
            </p>
          </div>
          <div>
            <span className="font-semibold">
              <FormattedMessage id="imprint.editorialContent"></FormattedMessage>
              :
            </span>
            <p>
              <FormattedMessage id="imprint.responsible"></FormattedMessage> §
              55 Abs.2 RStV <br />
              Lars Schieffer <br />
              Franz-Marc-Weg 2 <br />
              66564 Ottweiler
            </p>
          </div>
        </div>
      </BoxRounded>
    </div>
  );
};

export default Imprint;
