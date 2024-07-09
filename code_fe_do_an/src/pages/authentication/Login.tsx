import { GoogleButton } from "@/components/authentication";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hook/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";

// Định nghĩa schema với Zod
const emailSchema = z
  .string()
  .email({ message: "Email không hợp lệ" })
  .refine((val) => val.endsWith("@gmail.com"), {
    message: "Email phải kết thúc bằng đuôi @gmail.com",
  });

const passwordSchema = z
  .string()
  .min(8, { message: "Mật khẩu phải có ít nhất 8 kí tự" });

const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate()
  const { setUser } = auth;
  const [Account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedAccount = localStorage.getItem("rememberMe");
    if (savedAccount) {
      setAccount(JSON.parse(savedAccount));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAccount({ ...Account, [id]: value });

    try {
      if (id === "email") {
        emailSchema.parse(value);
        setErrors((prev) => ({ ...prev, email: undefined }));
      } else if (id === "password") {
        passwordSchema.parse(value);
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [id]: err.errors[0].message }));
      }
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
    if (!checked) {
      localStorage.removeItem("rememberMe");
    }
  };

  const handleSubmit = async () => {
    try {
      LoginSchema.parse(Account);
      setErrors({});

      const request = await axios.post("/login", Account);
      const response = request.data;
      if (response.statusCode === 200) {
        // alert(response.data?.message);
        const result = response.data.data;
        setUser(result);
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify(Account));
        }
        if (result.role_id === 1) {
          navigate("/admin")
      } else {
        // alert(response.data?.message);
      }
    }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors: { email?: string; password?: string } = {};
        err.errors.forEach((issue) => {
          if (issue.path.includes("email")) {
            validationErrors.email = issue.message;
          } else if (issue.path.includes("password")) {
            validationErrors.password = issue.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(()=>{
    window.addEventListener('resize', () => {
      setWidthScreen(window.innerWidth)
    })
    return () => {
      window.removeEventListener('resize', () => {
        setWidthScreen(window.innerWidth)
      })
    }
  })
  
  if (widthScreen >= 1000) return (
    <div className="flex flex-row w-5/6 h-[770px] justify-between py-10 ">
      <div className="flex flex-col gap-6 pt-6 basis-2/5">
        <div className="text-3xl font-semibold text-center">Đăng nhập</div>
        <div className="flex flex-col gap-5">
          {/* Input email */}
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

          {/* Input password */}
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

          {/* Remember pw and forgot pw */}
          <div className="flex">
            <div className="flex items-center pr-4 space-x-2">
              <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={handleRememberMeChange} />
              <label
                htmlFor="rememberMe"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Nhớ mật khẩu
              </label>
            </div>
            <div className="w-[290px] text-right">
              <NavLink
                className={"text-sm text-[#a9dd6d]"}
                to={"/ForgotPassword"}
              >
                Quên mật khẩu?
              </NavLink>
            </div>
          </div>
        </div>

        {/* Login button and Google button */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#70be58] shadow-md"
          >
            Đăng nhập
          </Button>
          <div className="text-center">Hoặc</div>
          <GoogleButton />
        </div>
      </div>
      <div className="basis-3/6">
        <img className="w-full h-full" src="/login-register.png" alt="" />
      </div>
    </div>
  );
  if (widthScreen < 1000) return (
    <div className="w-4/5 h-[770px] flex flex-col gap-3 pt-9">
      <div className="basis-2/6">
        <img className="w-full h-[250px]" src="/login-register.png" alt="" />
      </div>
      <div className="flex flex-col gap-6 pt-6 basis-3/6">
        <div className="text-3xl font-semibold text-center">Đăng nhập</div>
        <div className="flex flex-col gap-5">
          {/* Input email */}
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

          {/* Input password */}
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

          {/* Remember pw and forgot pw */}
          <div className="flex">
            <div className="flex items-center pr-4 space-x-2">
              <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={handleRememberMeChange} />
              <label
                htmlFor="rememberMe"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Nhớ mật khẩu
              </label>
            </div>
            <div className="w-[290px] text-right">
              <NavLink
                className={"text-sm text-[#a9dd6d]"}
                to={"/ForgotPassword"}
              >
                Quên mật khẩu?
              </NavLink>
            </div>
          </div>
        </div>

        {/* Login button and Google button */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#70be58] shadow-md"
          >
            Đăng nhập
          </Button>
          <div className="text-center">Hoặc</div>
          <GoogleButton />
        </div>
      </div>
    </div>
  )
  ; 
}
