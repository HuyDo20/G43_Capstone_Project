import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <NavLink
        to={"/"}
        className="flex items-center gap-5 text-lg font-semibold md:text-base"
      >
        <img className="size-24" src="/logo.png" />
        <div>
          <div className="text-[#6fb24d]">Dekiru Nihongo</div>
          <div className="text-[#6fb24d]">Learning System</div>
        </div>
        {/* <span className="font-semibold text-3xl">DNLS</span> */}
      </NavLink>
    </div>
  );
}
