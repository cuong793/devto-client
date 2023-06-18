"use client";
import { useAuthRequest } from "@/hooks/request";
import { setUser } from "@/store/actions";
import reducer, { initState } from "@/store/reducer";
import { setAccessToken } from "@/utils/auth/access-token";
import localStorageAvailable from "@/utils/auth/localStorageAvailable";
import toast, { Toaster } from "react-hot-toast";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { getMe } = useAuthRequest();
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";
      if (accessToken) {
        setAccessToken(accessToken);
        const resp = await getMe();
        dispatch(
          setUser({
            user: resp.data,
            isAuthenticated: true,
          })
        );
      }
    } catch (e) {
      toast.error("Error! An error occurred. Please try again later");
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AuthContext.Provider value={{ state, dispatch, initialize }}>
      {children}
      {/* <Toaster/> */}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
