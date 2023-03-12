import { FaLinkedinIn, FaXing } from "react-icons/fa";

export default function Profile() {
  return (
    <div className="relative flex flex-col items-center gap-4 rounded-3xl bg-white px-8 pt-36">
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
      <div className="my-2 flex gap-7">
        <FaLinkedinIn />
        <FaXing />
      </div>
      <div className="h-44 w-full bg-red-300">
        <span>Hi world!</span>
      </div>
    </div>
  );
}
