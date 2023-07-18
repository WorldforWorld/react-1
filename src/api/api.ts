import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "ecde3c0d-59e4-455a-83a2-08df3f1d6c37",
  },
});
export enum ResultCodeEnum {
  Succes = 0,
  Error = 1,
}
export enum ResultCodeEnumForCaptcha {
  CaptchaIsRequired = 10,
}
export type GetItemsType = {
  items: Array<UserType>;
  totalUserCount: number;
  error: string | null;
};
export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
