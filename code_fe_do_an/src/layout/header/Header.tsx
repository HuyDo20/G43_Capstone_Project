import { useAuth } from "@/hook/AuthContext";
import Logo from "../Logo";
import LoginButton from "./LoginButton";
import { Nav } from "./Nav";
import { UserDropDown } from "./UserDropDown";

export default function Header() {
  const auth = useAuth();
  return (
    <div className="w-full h-28">
      <div className="container flex items-center justify-between h-full">
        <Logo />
        <div className="flex gap-7">
          <Nav />
          {auth.user?.token ? <UserDropDown /> : <LoginButton />}
        </div>
      </div>
    </div>
  );
}
