import { isEmptyObj } from "@/helper";
import axios, { AxiosRequestConfig } from "axios";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
// Định nghĩa kiểu dữ liệu cho context

interface User {
  full_name: string;
  email: string;
  phone_number: string;
  dob: Date;
  avatar: string;
  role_id: number;
  point: number;
  status_id: number;
  token: string;
}

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<boolean>>;
  // login: (email: string, password: string) => void;
  handleLogout: () => void;
};

// Khởi tạo context với giá trị mặc định
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user") || "{}") || null
  );

  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
        let token =""
        const userEncode = localStorage.getItem("user");
        if (userEncode) {
          const userDecode = JSON.parse(userEncode);
          token = userDecode?.token;
        }
        const payload = {account_id: user?.account_id}
        const request = await axios.post("/logout", payload,{
          headers: {
              'Authorization': token
        },
    }  );
      const response = request.data;
      if (response.statusCode === 200) {
        localStorage.removeItem("user");
        navigate("/");
        setUser({});
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!isEmptyObj(user)) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface RequestOptions<T> {
  method: string;
  url: string;
  data?: T;
  token?: string;
}

export async function useAuthAPI<T, R>({
  method,
  url,
  data,
}: RequestOptions<T>): Promise<R> {
  try {
    const context = useAuth();

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: context.user?.token
        ? { Authorization: context.user.token }
        : undefined,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error making request", error);
    throw error;
  }
}
