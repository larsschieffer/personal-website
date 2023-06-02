import { FormattedMessage } from "react-intl";
import BoxRounded from "~/components/box/box-rounded";

export default function Imprint() {
  return (
    <div className="mx-6 grid h-screen place-items-center">
      <BoxRounded>
        <div className="flex flex-col content-center gap-8 bg-white p-8">
          <div>
            <span className="font-semibold">Contact:</span>
            <p>
              Lars Schieffer <br />
              Neugasse 1a <br />
              65719 Hofheim am Taunus <br />
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
              Neugasse 1a <br />
              65719 Hofheim am Taunus
            </p>
          </div>
        </div>
      </BoxRounded>
    </div>
  );
}
