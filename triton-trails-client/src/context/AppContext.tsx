import { createContext, useState, useContext } from "react";
import { Trail, User } from "../types/types";

interface AppContextType {
  trails: Trail[];
  setTrails: React.Dispatch<React.SetStateAction<Trail[]>>;
  user: User | null; // Assuming you have a User type defined
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialState: AppContextType = {
  trails: [],
  setTrails: () => {},
  user: null,
  setUser: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [trails, setTrails] = useState<Trail[]>(initialState.trails);
  const [user, setUser] = useState<User | null>(initialState.user);

  return (
    <AppContext.Provider value={{ trails, setTrails, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
