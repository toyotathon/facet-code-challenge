import React, { FC, useState, useCallback, useContext, useEffect } from "react";
import { Form } from "../types";
import { DashboardRequests } from "../requests/DashboardRequests";

interface ApiContextStore {
  formData: Form[];
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
}

const initialApiState = {
  formData: [] as Form[],
  netWorth: 0,
  totalAssets: 0,
  totalLiabilities: 0,
};

export const ApiContext = React.createContext({
  store: initialApiState,
  updateDashboardData: () => {},
});

export const ApiProvider: FC = ({ children }) => {
  const [apiState, setApiState] = useState<ApiContextStore>(initialApiState);

  const updateDashboardData = useCallback(async () => {
    const {
      formData,
      netWorth,
      totalLiabilities,
      totalAssets,
    } = await DashboardRequests.getDashboardData();
    setApiState({ formData, netWorth, totalLiabilities, totalAssets });
  }, []);

  useEffect(() => {
    updateDashboardData();
  }, [updateDashboardData]);

  return (
    <ApiContext.Provider value={{ store: apiState, updateDashboardData }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const { store, updateDashboardData } = useContext(ApiContext);
  return {
    store,
    updateDashboardData,
  };
};
