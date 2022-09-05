export const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
};

export const ACTION_TYPES = {
  INPUT: "INPUT",
  NAME: "NAME",
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
  CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
  LOADING: "LOADING",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.INPUT:
      state = { ...state, ...payload };
      break;
    case ACTION_TYPES.NAME:
      state = { ...state, name: payload };
      break;
    case ACTION_TYPES.EMAIL:
      state = { ...state, email: payload };
      break;
    case ACTION_TYPES.PASSWORD:
      state = { ...state, password: payload };
      break;
    case ACTION_TYPES.CONFIRM_PASSWORD:
      state = { ...state, confirmPassword: payload };
      break;
    case ACTION_TYPES.LOADING:
      state = { ...state, isLoading: payload };
      break;
    default:
      break;
  }
  return state;
};
