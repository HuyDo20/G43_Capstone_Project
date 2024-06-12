import { Label } from '@radix-ui/react-label';
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function DetailUserProfile() {
    const Account = {
        name: "Nguyễn Đình Thành Quang",
        email: "quanggk98@gmail.com",
        phoneNumber: "0123456789",
        dob: "03/05/2002",
      };
  return (
    <div className="flex flex-col w-3/4 gap-10 p-10 bg-white shadow-sm h-3/5 rounded-3xl">
            <div className="text-xl font-semibold text-center">
              THÔNG TIN CÁ NHÂN
            </div>
            <div className="flex flex-col gap-5 pl-16">
              <div className="flex flex-row items-center gap-7">
                <Label className="w-1/6" htmlFor="name">
                  Họ và tên
                </Label>
                <Input
                  className="w-1/2"
                  type="text"
                  value={Account.name}
                  id="name"
                  readOnly
                />
              </div>
              <div className="flex flex-row items-center gap-7">
                <Label className="w-1/6" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="w-1/2"
                  type="text"
                  value={Account.email}
                  id="email"
                  readOnly
                />
              </div>
              <div className="flex flex-row items-center gap-7">
                <Label className="w-1/6" htmlFor="phoneNumber">
                  Số điện thoại
                </Label>
                <Input
                  className="w-1/2"
                  type="text"
                  value={Account.phoneNumber}
                  id="phoneNumber"
                  readOnly
                />
              </div>
              <div className="flex flex-row items-center gap-7">
                <Label className="w-1/6" htmlFor="dob">
                  Ngày sinh
                </Label>
                <Input
                  className="w-1/2"
                  type="text"
                  value={Account.dob}
                  id="dob"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 mt-2">
              <Button className="w-1/3 bg-[#eeb55f] hover:bg-[#ff9800]">
                Thay đổi thông tin
              </Button>
              <Button className="w-1/3 bg-[#eeb55f] hover:bg-[#ff9800]">
                Thay đổi mật khẩu
              </Button>
            </div>
          </div>
  )
}
