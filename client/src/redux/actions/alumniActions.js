import { getAlumni } from "../../services/apiService";

export const FETCH_ALUMNI_SUCCESS = "FETCH_ALUMNI_SUCCESS";

export const fetchAlumni = (filters) => async (dispatch) => {
  const data = await getAlumni(filters);
  dispatch({ type: FETCH_ALUMNI_SUCCESS, payload: data });
};
