import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  return (
    <div className="flex items-center justify-center w-full mt-24">
      <div className="flex flex-col w-full h-[500px] gap-10 p-10 bg-white shadow-sm rounded-3xl">
        <div className="mt-5 text-xl font-semibold text-center">
          THAY ĐỔI MẬT KHẨU
        </div>
        <div className="flex flex-col gap-3 h-[300px] px-20">
          <div className="flex flex-row w-full py-3 basis-1/4">
            <div className="w-full basis-1/3">Nhập mật khẩu cũ</div>
            <div className="relative flex flex-row items-center basis-1/2">
              <Input
                type={showPassword ? "text" : "password"}
                className="w-full"
                placeholder="Nhập mật khẩu cũ"
              />
              {showPassword ? (
                <FaRegEye
                  className="absolute cursor-pointer right-3"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute cursor-pointer right-3"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row w-full py-3 basis-1/4">
            <div className="w-full basis-1/3 ">Nhập mật khẩu mới</div>
            <div className="relative flex flex-row items-center basis-1/2">
              <Input
                type={showNewPassword ? "text" : "password"}
                className="w-full"
                placeholder="Tói thiểu 8 ký tự"
              />
              {showNewPassword ? (
                <FaRegEye
                  className="absolute cursor-pointer right-3"
                  onClick={() => setShowNewPassword(false)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute cursor-pointer right-3"
                  onClick={() => setShowNewPassword(true)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row w-full py-3 basis-1/4">
            <div className="w-full basis-1/3 ">Nhập lại mật khẩu mới</div>
            <div className="relative flex flex-row items-center basis-1/2">
              <Input
                type={showReNewPassword ? "text" : "password"}
                className="w-full"
                placeholder="Nhập lại mật khẩu mới"
              />
              {showReNewPassword ? (
                <FaRegEye
                  className="absolute cursor-pointer right-3"
                  onClick={() => setShowReNewPassword(false)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute cursor-pointer right-3"
                  onClick={() => setShowReNewPassword(true)}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-full py-3 basis-1/4">
            <Button className="bg-[#eeb55f] hover:bg-[#ff9800]">
              Thay đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
