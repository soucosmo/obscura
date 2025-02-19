import { API_URL } from "./config";
import { create } from "zustand";

interface AuthState {
  rootTokenExists?: boolean;
  token: string;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  generateRootToken: () => void;
  checkRootTokenExists: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    const token = localStorage.getItem("token") ?? "";
  
    return {
      rootTokenExists: undefined,
      token,
      isAuthenticated: !!token,
      checkRootTokenExists: () => {
        fetch(`${API_URL}/api/token/root-exists`)
            .then((res) => {
                console.log('reees', res)
                set({ rootTokenExists: res.status == 200 })
            })
      },
      generateRootToken: () => {
        fetch(`${API_URL}/api/token/root-generate`, {
            method: 'post',
        })
            .then(async (res) => {
                return {
                    status: res.status,
                    text: await res.text()
                }
            }).then((data) => {
                console.log(data)
                if (data.status === 201) {
                    set({
                        rootTokenExists: true,
                        token: data.text,
                    })
                }
            })
      },
      login: async (token) => {
        const response = await fetch("https://api.exemplo.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) throw new Error("Credenciais inválidas");
  
        const data = await response.json();
        //set({ user: username, token: data.token, isAuthenticated: true });
        localStorage.setItem("token", data.token);
      },
      logout: () => {
        //set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("token");
      },
    };
  });
  