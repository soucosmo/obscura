import { create } from "zustand";

interface ObscuraState {
    isAuhenticated: boolean;
    token: string;
    rootTokenExists: boolean;
    setToken: (token: string) => void;
    checkToken: () => void;
    clearToken: () => void;
    checkRootToken: () => void;
}

export const useObscuraStore = create<ObscuraState>((set, get) => ({
  rootTokenExists: false,
  isAuhenticated: false,
  token: "",
  checkToken: () => {
        const token = localStorage.getItem("token")

        if (token) {
        set({ token })
        }


        get().checkRootToken()
  },
  setToken: (token: string) => {
    localStorage.setItem("token", token);

        set({ token });
  },
  clearToken: () => {
        localStorage.removeItem("token");
        set({ token: "" });
  },
  checkRootToken: () => {
      return;
    if (get().rootTokenExists) {
    }

    fetch("/api/token/root-exists")
        .then((res) => {
            set({ rootTokenExists: res.status != 200 })
        })
  }
}));
