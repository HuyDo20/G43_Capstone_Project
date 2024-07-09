import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/layout/Logo";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function GetNewPassword() {
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = () => {
    console.log(Password);
  };
  return (
    <div className="flex justify-center pt-28">
      <div className=" flex flex-col gap-16 px-20 pt-10 w-[800px] h-[700px] border border-[#7d9c64]">
        <Logo />
        <div>
          <div className="text-2xl font-semibold">Mật khẩu mới</div>
          <div className="flex flex-col gap-10">
            <div> Mật khẩu của bạn phải ít nhất 8 ký tự </div>
            <div className=" grid w-full items-center gap-1.5">
              <Label className="font-semibold" htmlFor="email">
                Nhập mật khẩu mới
              </Label>
              <div className="flex gap-3">
                <Input
                  type="text"
                  id="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Vui lòng nhập mật khẩu mới"
                />
              </div> 
              <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="">Mật khẩu</Label>
            <Input
              type="password"
              id="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Tối thiểu 8 ký tự"
              className="bg-[#f3f4f6]"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="">Nhập lại mật khẩu</Label>
            <Input
              type="password"
              id="repassword"
              placeholder="Nhập lại mật khẩu"
              className="bg-[#f3f4f6]"
            />
          </div>
            </div>
          </div>
          <Link to={"/getNewPWSuccess"}>
            <Button onClick={handleSubmit} className="w-full mt-5">Xác nhận</Button>
          </Link>
          
          <div className="mt-8 text-center">
            <NavLink className={"w-fit"} to={"/"}>
              Quay lại trang chủ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
