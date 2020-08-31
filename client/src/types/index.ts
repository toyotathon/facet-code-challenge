export enum FormType {
  ASSET = "Asset",
  LIABILITY = "Liability",
}

export interface Form {
  id: number;
  formType: FormType;
  name: string;
  balance: number;
}

export interface CreateFormRequest {
  formType: FormType;
  name: string;
  balance: number;
}

export interface DeleteFormsRequest {
  formIds: number[];
}

export interface GetDashboardDataResponse {
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
  formData: Form[];
}
