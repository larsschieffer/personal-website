import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar";
import { HiOutlineLocationMarker } from "@react-icons/all-files/hi/HiOutlineLocationMarker";
import { MdFileDownload } from "@react-icons/all-files/md/MdFileDownload";

import { BsEnvelope } from "@react-icons/all-files/bs/BsEnvelope";

import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";
import { FaXing } from "@react-icons/all-files/fa/FaXing";

import ProfileItem from "./profile-item";
import RoundedBox from "./rounded-box";

export default function Profile({ resumeURL }: { resumeURL: string }) {
  return (
    <div className="relative">
      <RoundedBox>
        <div className="flex flex-col items-center gap-4 bg-white px-8 pt-8 sm:flex-row sm:p-8 md:flex-col md:pt-36 md:pb-0">
          <img
            className="h-44 w-44 rounded-3xl md:absolute md:left-1/2 md:top-0 md:-translate-y-1/3 md:-translate-x-1/2"
            src="/assets/profile.png"
            alt="Profile picture"
          />
          <div className="flex flex-1 flex-col items-center gap-4 sm:items-end md:items-center">
            <span className="block font-merriweather text-3xl">
              Lars <strong className="font-black">Schieffer</strong>
            </span>
            <span className="w-fit rounded-[50px] bg-gray-lighter px-4 py-2">
              Software Developer
            </span>
            <div className="mt-2 mb-6 flex gap-7 sm:pr-7 md:pr-0">
              <a
                className="hover:scale-110 hover:text-[#0072b1]"
                href="https://www.linkedin.com/in/larsschieffer/"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
              <a
                className="hover:scale-110 hover:text-[#0698a0]"
                href="https://www.xing.com/profile/Lars_Schieffer/"
                target="_blank"
              >
                <FaXing />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 bg-gray-lighter px-8 py-5 sm:flex-row sm:justify-between md:flex-col">
          <div className="mx-auto flex w-fit flex-col gap-5 sm:mx-0 md:mx-auto">
            <ProfileItem
              icon={<BsCalendar />}
              description="December, 1996"
            ></ProfileItem>
            <ProfileItem
              icon={<HiOutlineLocationMarker />}
              description="Frankfurt, Germany"
            ></ProfileItem>
            <ProfileItem
              icon={<BsEnvelope />}
              description="contact@larsschieffer.de"
            ></ProfileItem>
          </div>
          <a href={resumeURL} download="lebenslauf.pdf">
            <button className="rounded-3xl bg-accent py-4 px-8 sm:mt-0 sm:px-12">
              <span className="inline-flex items-center gap-2 text-lg text-white">
                <MdFileDownload /> Download CV
              </span>
            </button>
          </a>
        </div>
      </RoundedBox>
    </div>
  );
}
