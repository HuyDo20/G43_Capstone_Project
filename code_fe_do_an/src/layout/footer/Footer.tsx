import Logo from "../Logo";
import AboutFooter from "./AboutFooter";
import Contact from "./Contact";
import IconFooter from "./IconFooter";

export default function Footer() {
  return (
    <div className="relative w-full">
      <div className="absolute top-20 left-1/2 -translate-x-1/2">
        <div className="w-[1600px] flex flex-row justify-around">
          <Logo />
          <Contact />
          <AboutFooter />
          <IconFooter />
        </div>
      </div>
      <img src="/footer.png" className="w-full" />
    </div>
  );
}
