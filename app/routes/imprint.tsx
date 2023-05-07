import RoundedBox from "~/components/rounded-box";

export default function Imprint() {
  return (
    <div className="mx-6 grid h-screen place-items-center">
      <RoundedBox>
        <div className="flex flex-col content-center gap-8 bg-white p-8">
          <div>
            <span className="font-semibold">Contact:</span>
            <p>
              Lars Schieffer <br />
              Neugasse 1a <br />
              65719 Hofheim am Taunus <br />
              Email: contact@larsschieffer.de
            </p>
          </div>
          <div>
            <span className="font-semibold"> For editorial content:</span>
            <p>
              Responsible according to § 55 Abs.2 RStV <br />
              Lars Schieffer <br />
              Neugasse 1a <br />
              65719 Hofheim am Taunus
            </p>
          </div>
        </div>
      </RoundedBox>
    </div>
  );
}
