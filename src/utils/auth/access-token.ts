import request from "@/services/api.request";

export const setAccessToken = (accessToken: string)=>{
  if(accessToken){
    localStorage.setItem('accessToken', accessToken);
    request.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }else {
    localStorage.removeItem('accessToken');
    delete request.defaults.headers.common.Authorization;
  }
}