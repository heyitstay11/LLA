export const initialState = {
  title: "",
  description: "",
  courseID: "",
  loading: false,
  parts: [],
  partType: "Video",
  partValue: "",
  partDescription: "",
};

export const ACTION_TYPES = {
  INPUT: "INPUT",
  ADD_PART: "ADD_PART",
  LOADING: "LOADING",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.INPUT:
      state = { ...state, ...payload };
      break;
    case ACTION_TYPES.ADD_PART:
      state = {
        ...state,
        parts: [...state.parts, payload],
        partType: "Video",
        partValue: "",
        partDescription: "",
      };
      break;
    default:
      console.log(type, payload);
  }
  return state;
};
