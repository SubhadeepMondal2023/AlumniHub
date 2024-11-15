import { FETCH_ALUMNI_SUCCESS } from "../actions/alumniActions";

const initialState = {
  alumni: [],
  totalPages: 1,
};

export const alumniReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALUMNI_SUCCESS:
      return {
        ...state,
        alumni: action.payload.alumni,
        totalPages: action.payload.totalPages,
      };
    default:
      return state;
  }
};

export default alumniReducer