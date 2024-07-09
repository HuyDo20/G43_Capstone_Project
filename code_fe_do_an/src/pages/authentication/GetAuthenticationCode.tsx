import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/layout/Logo";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function GetAuthenticationCode() {
  const [AuthenticationCode, setAuthenticationCode] = useState("");
  const handleSubmit = () => {
    console.log(AuthenticationCode);
  };
  return (
    <div className="flex justify-center pt-28">
      <div className=" flex flex-col gap-16 px-40 pt-20 w-[800px] h-[700px] border border-[#718d5a]">
        <Logo />
        <div>
          <div className="text-2xl font-semibold">Quên mật khẩu?</div>
          <div className="flex flex-col gap-10">
            <div> Nhập mã xác thực đã gửi tới email của bạn. </div>
            <div className=" grid w-full items-center gap-1.5">
              <Label className="font-semibold" htmlFor="email">
                Mã xác thực
              </Label>
              <div className="flex gap-3">
                <Input
                  type="email"
                  id="email"
                  value={AuthenticationCode}
                  onChange={(e) => setAuthenticationCode(e.target.value)}
                  placeholder="Vui lòng nhập mã xác thực"
                />
              </div>
            </div>
          </div>
          <Link to={"/getNewPassword"}>
            <Button onClick={handleSubmit} className="w-full mt-5">Xác nhận</Button>
          </Link>
          <div className="flex pt-5">
            <div className="basis-1/2">Chưa nhận được mã?</div>
            <div className="text-right text-black basis-1/2">Gửi lại mã xác thực</div>
          </div>
          <div className="mt-12 text-center">
            <NavLink className={"w-fit"} to={"/"}>
              Quay lại trang chủ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
