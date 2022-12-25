export const initialState = {
  title: "",
  details: "",
  proficiency: "Beginner",
  price: "",
  thumbnail: "",
  currentLearning: "",
  learnings: [],
};

export const ACTION_TYPES = {
  INPUT: "INPUT",
  ADD_LEARNING: "ADD_LEARNING",
  LOADING: "LOADING",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.INPUT:
      state = { ...state, ...payload };
      break;
    case ACTION_TYPES.ADD_LEARNING:
      state = {
        ...state,
        learnings: [...state.learnings, payload],
        currentLearning: "",
      };
      break;
    default:
      console.log(type, payload);
  }
  return state;
};
