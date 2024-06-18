import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hook/AuthContext";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export function UserDropDown() {
  const auth = useAuth();
  const {handleLogout} = auth
  const navigate = useNavigate();
  const handleUserProfile = () => {
    navigate("/userProfile");
  };
  return (
    <div className="flex gap-5">
      <FaBell className="size-9 text-[#56a251]" />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUserProfile}>Thông tin cá nhân</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
