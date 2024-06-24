import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChangePassword,
  DetailUserProfile,
  GameHistory,
  LearningProcess,
  Notification,
} from "@/components/userProfile";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/hook/AuthContext";
export default function UserProfile() {
  const { user } = useAuth();
  const [input, setInput] = useState<File | null>(null);

  const handleOnSubmitFile = async () => {
    
    const formData = new FormData();
    formData.append("userAvatar", input)
    try {
      const response = await axios.put(`/account/${user.account_id}`, formData, {
        headers: {
          Authorization: user.token,
        },
      });
      if (response.status == 200) {
        // setMessage(response.data.data.message);
        // alert(response.data.data.message);
      } else {
        throw new Error("Somthing went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#fff8e1] h-full w-full">
      <div className="container h-full ">
        <Header />
        <div className="bg-white shadow-md p-7">
          <div className="flex flex-row h-[900px] bg-[#f1f8e9] rounded-3xl w-full">
            <div className="m-20">
              <Tabs defaultValue="account" className="flex flex-col w-[1300px]">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col items-center gap-10 basis-1/4">
                    <Avatar className="mt-14 size-52">
                      <AvatarImage
                        className="rounded-full"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center w-full max-w-sm gap-3 flex- ">
                      <div className="flex flex-row items-center justify-center gap-3">
                        <FaCamera />
                        <Label className="text-center">Tải ảnh lên</Label>
                      </div>
                      <div className="flex flex-row gap-3 w-[250px]">
                        <Input
                          className="basis-3/4"
                          id="picture"
                          type="file"
                          multiple={false}
                          accept=".png,.jpg,.jpeg"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setInput(event.target.files[0]);
                            console.log(event.target.files[0]);
                          }}
                        />
                        <Button
                          className="basis-1/4"
                          onClick={handleOnSubmitFile}
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </div>
                    <TabsList className="flex flex-col w-full gap-2 mt-24 bg-[#f1f8e9]">
                      <TabsTrigger value="account" className="mb-2">
                        Thông tin cá nhân
                      </TabsTrigger>
                      <TabsTrigger value="password">
                        Thay đổi mật khẩu
                      </TabsTrigger>
                      <TabsTrigger value="notification">Thông báo</TabsTrigger>
                      <TabsTrigger value="learningProcess">
                        Tiến độ học tập
                      </TabsTrigger>
                      <TabsTrigger value="game">Lịch sử trò chơi</TabsTrigger>
                    </TabsList>
                  </div>
                  <div>
                    <hr className="w-1 h-[700px] bg-[#d2e7cb] ml-24 mt-5" />
                  </div>

                  <div className="ml-16 basis-3/4">
                    <TabsContent value="account">
                      <DetailUserProfile />
                    </TabsContent>
                    <TabsContent value="password">
                      <ChangePassword />
                    </TabsContent>
                    <TabsContent value="notification">
                      <Notification />
                    </TabsContent>
                    <TabsContent value="learningProcess">
                      <LearningProcess />
                    </TabsContent>
                    <TabsContent value="game">
                      <GameHistory />
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
