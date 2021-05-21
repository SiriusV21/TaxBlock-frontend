import { SET_LOAN_DATA, SET_USER_DATA } from "./constant";

export const setUserData = (payload) => {
  return { type: SET_USER_DATA, payload };
};

export const setLoanData = (payload) => {
  return { type: SET_LOAN_DATA, payload };
};
