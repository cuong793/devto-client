import { IChangePassword, IForgotPassword, ILogin, IRegister } from "@/interfaces/auth";
import request from "@/services/api.request";

export const useAuthRequest = () => {
  const register = async (data: IRegister) => {
    delete data.confirmPassword;
    return request.post("/auth/register", data);
  };
  
  const login = async (data: ILogin) => {
    return request.post("/auth/login", data);
  };

  const getMe = async () => {
    return request.get("/auth/me");
  };

  const forgotPassword = async(data: IForgotPassword)=>{
    return request.post("/auth/forgot-password",data)
  }

  const changePassword = async(data: IChangePassword )=>{
    return request.post("/auth/change-password", data)
  }

  return { login, register,forgotPassword,changePassword,getMe };
};
