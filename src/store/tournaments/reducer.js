const initialState = {
  tournaments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TOURNAMENTS_LOADED":
      return { tournaments: action.payload };
    default:
      return state;
  }
};
