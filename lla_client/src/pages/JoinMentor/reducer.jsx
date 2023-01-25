export const initialState = {
  fullname: "",
  teacher_email: "",
  qualification: "",
  experience: "",
  contact_num: "",
  isLoading: false,
};

export const ACTION_TYPES = {
  INPUT: "INPUT",
  LOADING: "LOADING",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.INPUT:
      state = { ...state, ...payload };
      break;
    case ACTION_TYPES.LOADING:
      state = { ...state, isLoading: payload };
      break;
    default:
      break;
  }
  return state;
};
