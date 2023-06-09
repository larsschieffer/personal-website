import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar";
import { BsEnvelope } from "@react-icons/all-files/bs/BsEnvelope";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";
import { FaRegFilePdf } from "@react-icons/all-files/fa/FaRegFilePdf";
import { FaXing } from "@react-icons/all-files/fa/FaXing";
import { HiOutlineLocationMarker } from "@react-icons/all-files/hi/HiOutlineLocationMarker";
import { FormattedMessage, useIntl } from "react-intl";
import { ASSETS_LOCATION } from "~/constants/assets-location";
import { notImplementedYet } from "~/services/under-construction";
import { BoxRounded } from "../box/box-rounded";
import { ProfileItem } from "./profile-item";

export const Profile = (): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="relative">
      <BoxRounded>
        <div className="flex flex-col items-center gap-4 bg-white px-6 pt-6 sm:flex-row sm:p-8 sm:px-10 sm:pt-10 md:flex-col md:pb-0 md:pt-36">
          <img
            className="h-44 w-44 rounded-3xl md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 md:-translate-y-1/3"
            src={`${ASSETS_LOCATION}portrait.webp`}
            alt={intl.formatMessage({ id: "profile.portrait" })}
          />
          <div className="flex flex-1 flex-col items-center gap-4 sm:items-end md:items-center">
            <span className="block font-merriweather text-3xl">
              Lars <strong className="font-black">Schieffer</strong>
            </span>
            <span className="w-fit rounded-[50px] bg-gray-lighter px-4 py-2">
              <FormattedMessage id="profile.jobTitle"></FormattedMessage>
            </span>
            <div className="mb-6 mt-2 flex gap-7 sm:pr-7 md:pr-0">
              <a
                className="hover:scale-110"
                href="https://github.com/larsschieffer"
                target="_blank"
                rel="noreferrer"
                aria-label="Github"
              >
                <FaGithub />
              </a>
              <a
                className="hover:scale-110 hover:text-[#0072b1]"
                href="https://www.linkedin.com/in/larsschieffer/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                className="hover:scale-110 hover:text-[#0698a0]"
                href="https://www.xing.com/profile/Lars_Schieffer/"
                target="_blank"
                rel="noreferrer"
                aria-label="Xing"
              >
                <FaXing />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 bg-gray-lighter px-6 py-5 sm:flex-row sm:justify-between sm:px-10 md:flex-col">
          <div className="mx-auto flex w-fit flex-col gap-5 sm:mx-0 md:mx-auto">
            <ProfileItem
              icon={<BsCalendar />}
              description={intl.formatMessage({ id: "profile.birthdayMonth" })}
            ></ProfileItem>
            <ProfileItem
              icon={<HiOutlineLocationMarker />}
              description={intl.formatMessage({
                id: "profile.currentLocation",
              })}
            ></ProfileItem>
            <ProfileItem
              icon={<BsEnvelope />}
              description={intl.formatMessage({ id: "contact.email" })}
            ></ProfileItem>
          </div>
          <button
            onClick={notImplementedYet}
            className="rounded-3xl bg-accent px-8 py-4 sm:mt-0 sm:px-12"
          >
            <span className="inline-flex items-center gap-2 text-lg text-white">
              <FaRegFilePdf />{" "}
              <FormattedMessage id="profile.requestCV"></FormattedMessage>
            </span>
          </button>
        </div>
      </BoxRounded>
    </div>
  );
};

export default Profile;
