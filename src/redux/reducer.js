import { SET_LOAN_DATA, SET_USER_DATA } from "./constant";

const initialUserData = {
  email: "",
  name: "",
  admin: false,
  loans: [],
};

const userReducer = (state = initialUserData, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, email: action.payload.email, name: action.payload.name, admin: action.payload.admin };
    case SET_LOAN_DATA:
      return { ...state, loans: action.payload };
    default:
      return state;
  }
};

export default userReducer;
