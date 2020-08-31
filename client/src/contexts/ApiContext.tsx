import React, { FC, useState, useCallback, useContext, useEffect } from "react";
import { Form, CreateFormRequest } from "../types";
import { DashboardRequests } from "../requests/DashboardRequests";
import { FormRequests } from "../requests/FormRequests";

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
  setStoreState: (store: ApiContextStore) => {},
});

export const ApiProvider: FC = ({ children }) => {
  const [apiState, setApiState] = useState<ApiContextStore>(initialApiState);

  useEffect(() => {
    DashboardRequests.getDashboardData().then(
      ({ formData, netWorth, totalLiabilities, totalAssets }) =>
        setApiState({ formData, netWorth, totalLiabilities, totalAssets })
    );
  }, []);

  return (
    <ApiContext.Provider
      value={{ store: apiState, setStoreState: setApiState }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const { store, setStoreState } = useContext(ApiContext);

  const updateDashboardData = useCallback(async () => {
    const {
      formData,
      netWorth,
      totalLiabilities,
      totalAssets,
    } = await DashboardRequests.getDashboardData();
    setStoreState({ formData, netWorth, totalLiabilities, totalAssets });
  }, [setStoreState]);

  const createForm = useCallback(
    async (form: CreateFormRequest) => {
      await FormRequests.createForm(form);
      await updateDashboardData();
    },
    [updateDashboardData]
  );

  return {
    store,
    updateDashboardData,
    createForm,
  };
};
