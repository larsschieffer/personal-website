import RoundedBox from "~/components/rounded-box";

export default function Imprint() {
  return (
    <div className="grid h-screen place-items-center ">
      <RoundedBox>
        <div className="flex content-center gap-8 bg-white p-8">
          <p>
            Contact: <br />
            Lars Schieffer <br />
            Neugasse 1a <br />
            65719 Hofheim am Taunus <br />
            Email: contact@larsschieffer.de
          </p>
          <p>
            For editorial content: <br />
            Responsible according to § 55 Abs.2 RStV <br />
            Lars Schieffer <br />
            Neugasse 1a <br />
            65719 Hofheim am Taunus
          </p>
        </div>
      </RoundedBox>
    </div>
  );
}
