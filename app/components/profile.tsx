import { BsCalendar } from "@react-icons/all-files/bs/BsCalendar";
import { HiOutlineLocationMarker } from "@react-icons/all-files/hi/HiOutlineLocationMarker";
import { MdFileDownload } from "@react-icons/all-files/md/MdFileDownload";

import { BsEnvelope } from "@react-icons/all-files/bs/BsEnvelope";

import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";
import { FaXing } from "@react-icons/all-files/fa/FaXing";

import ProfileItem from "./profile-item";

export default function Profile() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl">
        <div className="flex flex-col items-center gap-4 bg-white px-8 pt-36">
          <img
            className="absolute left-1/2 top-0 h-44 w-44 -translate-y-1/3 -translate-x-1/2 rounded-[48px]"
            src="/assets/profile.png"
            alt="Profile picture"
          />
          <span className="block font-merriweather text-3xl">
            Lars <strong className="font-black">Schieffer</strong>
          </span>
          <span className="w-fit rounded-[50px] bg-gray-lighter px-4 py-2">
            Software Developer
          </span>
          <div className="mt-2 mb-6 flex gap-7">
            <FaLinkedinIn />
            <FaXing />
          </div>
        </div>
        <div className=" bg-gray-lighter px-8 py-5">
          <div className="mx-auto flex w-fit flex-col gap-5">
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

          <button className="mt-5 rounded-3xl bg-blue-600 py-4 px-12">
            <span className="inline-flex items-center gap-2 text-lg text-white">
              <MdFileDownload /> Download CV
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
