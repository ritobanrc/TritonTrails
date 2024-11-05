import { createContext, useState } from "react";
import { Trail } from "../types/types";

interface AppContextType {
  trails: Trail[];
  setTrails: React.Dispatch<React.SetStateAction<Trail[]>>;
}

const initialState: AppContextType = {
  trails: [],
  setTrails: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [trails, setTrails] = useState<Trail[]>(initialState.trails);
  return (
    <AppContext.Provider
      value={{
        trails: trails,
        setTrails: setTrails,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
