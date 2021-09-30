import { AxiosError } from "axios";
import { RootStore } from "../store/configureStore";

export type FillActionType<T> = (
    payload: T,
  ) => {
    type: string;
    payload: T;
  };
  
  export type ErrorActionType = (
    payload: AxiosError,
  ) => {
    type: string;
    payload: AxiosError;
  };

  export const getState = (state: RootStore): RootStore => state
