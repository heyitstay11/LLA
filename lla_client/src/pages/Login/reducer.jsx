export const initialState = {
  email: "",
  password: "",
  isLoading: false,
};

export const ACTION_TYPES = {
  INPUT: "INPUT",
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
  LOADING: "LOADING",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.INPUT:
      state = { ...state, ...payload };
      break;
    case ACTION_TYPES.EMAIL:
      state = { ...state, email: payload };
      break;
    case ACTION_TYPES.PASSWORD:
      state = { ...state, password: payload };
      break;
    case ACTION_TYPES.LOADING:
      state = { ...state, isLoading: payload };
      break;
    default:
      break;
  }
  return state;
};
