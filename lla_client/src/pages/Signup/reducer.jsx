export const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isLoading: false
};

export const ACTION_TYPES = {
    NAME: 'NAME',
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD',
    C_PASSWORD: 'C_PASSWORD',
    LOADING: 'LOADING'
};

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
      switch (type) {
        case ACTION_TYPES.NAME:
          state = {...state, name: payload };
          break;
        case ACTION_TYPES.EMAIL:
          state = {...state, email: payload };
          break;
        case ACTION_TYPES.PASSWORD:
          state = {...state, password: payload };
          break;
        case ACTION_TYPES.C_PASSWORD:
          state = {...state, confirmPassword: payload };
          break;
        case ACTION_TYPES.LOADING:
          state = {...state, isLoading: payload };
          break;
        default:
          break;
      }
    return state;
  }