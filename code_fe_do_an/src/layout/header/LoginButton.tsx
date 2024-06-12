import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import Login from "@/pages/authentication/Login";
import Register from "@/pages/authentication/Register";
export default function LoginButton() {
  return (
    <div className="flex gap-x-3">
      {/* <Button variant="default" className=" text-white  w-32" size={"sm"}>
        <NavLink to={"/login"} className={"text-lg"}>Đăng nhập</NavLink>
      </Button> */}
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"  className=" text-white  w-32 bg-[#2dab59] text-lg"  size={"sm"}>Đăng nhập</Button>
      </DialogTrigger>
      <DialogContent >
        <Login/>
      </DialogContent>
    </Dialog>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"  className=" text-white  w-32 bg-[#2dab59] text-lg"  size={"sm"}>Đăng ký</Button>
      </DialogTrigger>
      <DialogContent >
        <Register/>
      </DialogContent>
    </Dialog>
    </div>
  );
}
