import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import Login from "@/pages/authentication/Login";
import Register from "@/pages/authentication/Register";
import { useState } from "react";
export default function LoginButton() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  
  const openLogin = () => {
    console.log("open Login");
    setIsLogin(true);
    setIsRegister(false);
  }
  
  return (
    <div className="flex gap-x-3">
      <Dialog open={isLogin} onOpenChange={(isOpen)=>{
        setIsLogin(isOpen);
      }}>
      <DialogTrigger asChild>
        <Button variant="outline"  className=" text-white  w-32 bg-[#2dab59] text-lg"  size={"sm"}>Đăng nhập</Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center w-2/3">
        <Login/>
      </DialogContent>
    </Dialog >
      <Dialog open={isRegister} onOpenChange={(isOpen)=>{
        setIsRegister(isOpen);
      }}>
      <DialogTrigger asChild>
        <Button variant="outline"  className=" text-white  w-32 bg-[#2dab59] text-lg"  size={"sm"}>Đăng ký</Button>
      </DialogTrigger>
      <DialogContent >
        <Register openLogin={()=>openLogin()}  />
      </DialogContent>
    </Dialog>
    </div>
  );
}
