import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hook/AuthContext";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { FaCamera } from "react-icons/fa";
export default function UserProfile() {

  const auth = useAuth();
  const {user} = auth


  
  return (
    
    <div className="bg-[#fff8e1] h-full w-full">
      <div className="container h-full ">
        <Header />
        <div className="bg-white shadow-md p-7">
          <div className="flex flex-row h-[900px] bg-[#f1f8e9] rounded-3xl">
            <div className="basis-1/4">
              <div className="flex flex-col items-center gap-7 p-14">
                <Avatar className="mt-14 size-52">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="grid items-center w-full max-w-sm gap-3">
                  <div className="flex flex-row items-center justify-center gap-3">
                    <FaCamera />
                    <Label className="text-center" htmlFor="picture">
                      Tải ảnh lên
                    </Label>
                  </div>

                  <Input id="picture" type="file" />
                </div>
                <div className="flex flex-col items-center gap-3 mt-10 text-[#8ebf81]">
                  <div>Thông tin cá nhân</div>
                  <div>Thông báo</div>
                  <div>Lịch sử học tập</div>
                  <div>Lịch sử trò chơi</div>
                </div>
              </div>
            </div>
            <hr className="w-1 h-3/4 border-2 border-[#d2e7cb] mt-28" />

            <div className="flex items-center justify-center basis-3/4">
              <div className="flex flex-col w-3/4 gap-10 p-10 bg-white shadow-sm h-3/5 rounded-3xl">
                <div className="text-xl font-semibold text-center">
                  THÔNG TIN CÁ NHÂN
                </div>
                <div className="flex flex-col gap-5 pl-16">
                  <div className="flex flex-row items-center gap-7">
                    <Label className="w-1/6" htmlFor="email">Họ và tên</Label>
                    <Input className="w-1/2" type="text" value={user?.full_name} id="name" readOnly/>
                  </div>
                  <div className="flex flex-row items-center gap-7">
                    <Label className="w-1/6" htmlFor="email">Email</Label>
                    <Input className="w-1/2" type="text" value={user?.email} id="email" readOnly/>
                  </div>
                  <div className="flex flex-row items-center gap-7">
                    <Label className="w-1/6" htmlFor="email">Số điện thoại</Label>
                    <Input className="w-1/2" type="text" value={user?.phone_number} id="phoneNumber" readOnly/>
                  </div>
                  <div className="flex flex-row items-center gap-7">
                    <Label className="w-1/6" htmlFor="email">Ngày sinh</Label>
                    <Input className="w-1/2" type="text" value={user?.dob} id="dob" readOnly/>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 mt-2">
                  <Button className="w-1/3 bg-[#eeb55f] hover:bg-[#ff9800]">Thay đổi thông tin</Button>
                  <Button className="w-1/3 bg-[#eeb55f] hover:bg-[#ff9800]">Thay đổi mật khẩu</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
