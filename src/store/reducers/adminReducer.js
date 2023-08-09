import actionTypes from "../actions/actionTypes";
const initialState = {
  isLoadingGender: [],
  isLoadingPosition: [],
  isLoadingRole: [],
  isLoadingUser: [],
  isLoadingDoctor: [],
  isLoadingDrs: [],

  genders: [],
  roles: [],
  positions: [],
  users: [],
  doctors: [],
  allDoctors: [],
  allDetailDoctor: [],
  allScheduleTime: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoadingGender = false;
      state.genders = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_START:
      state.isLoadingPosition = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.isLoadingPosition = false;
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.isLoadingPosition = false;
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_START:
      state.isLoadingRole = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.isLoadingRole = false;
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.isLoadingRole = false;
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_START:
      state.isLoadingUser = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.isLoadingUser = false;
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      state.isLoadingUser = false;
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_START:
      state.isLoadingDoctor = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.isLoadingDoctor = false;
      state.doctors = action.doctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIL:
      state.isLoadingDoctor = false;
      state.doctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_START:
      state.isLoadingDrs = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.isLoadingDrs = false;
      state.allDoctors = action.allDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      state.isLoadingDrs = false;
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DETAIL_DOCTOR_SUCCESS:
      state.allDetailDoctor = action.allDetailDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DETAIL_DOCTOR_FAIL:
      state.allDetailDoctor = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_SUCCESS:
      state.allScheduleTime = action.allScheduleTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_SCHEDULE_FAIL:
      state.allScheduleTime = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
