export default function Profile() {
  return (
    <div className="relative rounded-3xl bg-white px-8 pt-36">
      <img
        className="absolute left-1/2 top-0 h-44 w-44 -translate-y-1/3 -translate-x-1/2 rounded-[48px]"
        src="/assets/profile.png"
        alt="Profile picture"
      />
      <span className="font-merriweather text-3xl text-gray-dark">
        Lars <strong className="font-black">Schieffer</strong>
      </span>
    </div>
  );
}
