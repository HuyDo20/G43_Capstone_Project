import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/authentication";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { z } from "zod";
import axios from "axios";

const emailSchema = z
  .string()
  .email({ message: "Email không hợp lệ" })
  .refine((val) => val.endsWith("@gmail.com"), {
    message: "Email phải kết thúc bằng đuôi @gmail.com",
  });

const passwordSchema = z
  .string()
  .min(8, { message: "Mật khẩu phải có ít nhất 8 kí tự" });

const registerSchema = z
  .object({
    full_name: z.string().nonempty({ message: "Tên không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    rewritePassword: passwordSchema,
  })
  .refine((data) => data.password === data.rewritePassword, {
    message: "Nhập lại mật khẩu phải giống mật khẩu đã nhập",
    path: ["rewritePassword"],
  });

export default function Register() {
  const [Account, setAccount] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [RewritePassword, setRewritePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRewritePassword, setRewriteShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    full_name?: string;
    email?: string;
    password?: string;
    rewritePassword?: string;
  }>({});
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "rewritePassword") {
      setRewritePassword(value);
    } else {
      setAccount({ ...Account, [id]: value });
    }
  };
  const handleCheckboxChange = (checked: boolean) => {
    setIsTermsChecked(checked);
  };
  const handleSubmit = async () => {
    try {
      registerSchema.parse({ ...Account, rewritePassword: RewritePassword });
      setErrors({});
      // Thực hiện hành động sau khi xác thực thành công (ví dụ: gửi form)
      const request = await axios.post("/register", Account);
      console.log(request);
      const response = request.data;
      if (response.statusCode === 200) {
        alert(response.data?.message);
        // clear form
        // đóng modal
        // mở cửa sổ login
      } else {
        alert(response.data?.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors: {
          full_name?: string;
          email?: string;
          password?: string;
          rewritePassword?: string;
        } = {};
        err.errors.forEach((issue) => {
          validationErrors[issue.path[0]] = issue.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="flex flex-row w-[1100px] h-[770px] px-20 py-10">
      <div className="flex flex-col gap-6 pr-10 basis-1/2">
        <div className="text-3xl font-semibold text-center">
          Đăng ký tài khoản
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="full_name">Họ và tên</Label>
            <Input
              type="text"
              id="full_name"
              value={Account.full_name}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên"
              className="bg-[#f3f4f6]"
            />
            {errors.full_name && (
              <p style={{ color: "red" }}>{errors.full_name}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={Account.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              className="bg-[#f3f4f6]"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative flex flex-row items-center">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={Account.password}
                onChange={handleInputChange}
                placeholder="Tối thiểu 8 ký tự"
                className="bg-[#f3f4f6]"
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
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="rewritePassword">Nhập lại mật khẩu</Label>
            <div className="relative flex flex-row items-center">
              <Input
                type={showRewritePassword ? "text" : "password"}
                id="rewritePassword"
                value={RewritePassword}
                onChange={handleInputChange}
                placeholder="Tối thiểu 8 ký tự"
                className="bg-[#f3f4f6]"
              />
              {showRewritePassword ? (
                <FaRegEye
                  className="absolute cursor-pointer right-3"
                  onClick={() => setRewriteShowPassword(false)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute cursor-pointer right-3"
                  onClick={() => setRewriteShowPassword(true)}
                />
              )}
            </div>
            {errors.rewritePassword && (
              <p style={{ color: "red" }}>{errors.rewritePassword}</p>
            )}
          </div>
          <div className="flex items-center pr-4 space-x-2">
            <Checkbox id="terms"
              checked={isTermsChecked}
              onCheckedChange={handleCheckboxChange} />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <span>
                Tôi đồng ý với các <strong>điều khoản sử dụng</strong> và{" "}
                <strong>chính sách bảo mật</strong> của website
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#70be58] shadow-md"
            disabled={!isTermsChecked} 
          >
            Đăng ký
          </Button>
          <div className="text-center">Hoặc</div>
          <GoogleButton />
        </div>
      </div>
      <div className="basis-1/2">
        <img className="w-full h-full" src="/login-register.png" alt="" />
      </div>
    </div>
  );
}