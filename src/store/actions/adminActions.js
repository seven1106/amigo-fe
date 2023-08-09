import actionTypes from "./actionTypes";
import {
  getAllCodeApi,
  createNewUserApi,
  getAllUserApi,
  deleteUserApi,
  editUserApi,
  getTopDoctorHomeApi,
  getAllDoctorsApi,
  saveDetailInforDoctorApi,
  getAllSpecialtyApi,
} from "../../services/userService";
import { toast } from "react-toastify";
export const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo,
});

export const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeApi("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (dataGender) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: dataGender,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllCodeApi("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log(e);
    }
  };
};

export const fetchPositionSuccess = (dataPosition) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: dataPosition,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await getAllCodeApi("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log(e);
    }
  };
};

export const fetchRoleSuccess = (dataRole) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: dataRole,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserApi(data);
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch(createUserSuccess(res.data));
        dispatch(fetchAllUserStart());
        toast.success("Create new user success!");
      } else {
        dispatch(createUserFail());
        toast.error("Create new user error!");
      }
    } catch (e) {
      dispatch(createUserFail());
      console.log(e);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserApi(userId);
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch(deleteSuccess());
        dispatch(fetchAllUserStart());
        toast.success("Delete the user success!");
      } else {
        dispatch(deleteFail());
        toast.error("Delete the user error!");
      }
    } catch (e) {
      dispatch(deleteFail());
      console.log(e);
      toast.error("Delete the user error!");
    }
  };
};

export const deleteSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserApi(data);
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch(editSuccess());
        dispatch(fetchAllUserStart());
        toast.success("Update user success!");
      } else {
        dispatch(editFail());
        toast.error("Error!");
      }
    } catch (e) {
      dispatch(editFail());
      console.log(e);
      toast.error("Error!");
    }
  };
};

export const editSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const fetchAllUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_USER_START });

      let res = await getAllUserApi("ALL");
      if (res && res.errCode === 0) {
        // dispatch(fetchAllUserSuccess(res.userData));
        dispatch(fetchAllUserSuccess(res.userData.reverse()));
      } else {
        dispatch(fetchAllUserFail());
      }
    } catch (e) {
      dispatch(fetchAllUserFail());
      console.log(e);
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
});

export const fetchTopDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_START });

      let res = await getTopDoctorHomeApi(" ");
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorFail());
      }
    } catch (e) {
      dispatch(fetchTopDoctorFail());
      console.log(e);
    }
  };
};
export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  doctors: data,
});
export const fetchTopDoctorFail = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
});

export const fetchAllDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_START });
      let res = await getAllDoctorsApi();

      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorFail());
      }
    } catch (e) {
      dispatch(fetchAllDoctorFail());
      console.log(e);
    }
  };
};
export const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  allDoctors: data,
});
export const fetchAllDoctorFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
});

export const fetchScheduleStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeApi("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchScheduleSuccess(res.data));
      } else {
        dispatch(fetchScheduleFail());
      }
    } catch (e) {
      dispatch(fetchScheduleFail());
      console.log(e);
    }
  };
};
export const fetchScheduleSuccess = (data) => ({
  type: actionTypes.FETCH_SCHEDULE_SUCCESS,
  allScheduleTime: data,
});
export const fetchScheduleFail = () => ({
  type: actionTypes.FETCH_SCHEDULE_FAIL,
});
export const fetchAllDetailDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let resPri = await getAllCodeApi("PRICE");
      let resPay = await getAllCodeApi("PAYMENT");
      let resPro = await getAllCodeApi("PROVINCE");
      let resSpe = await getAllSpecialtyApi();
      if (
        resPri &&
        resPri.errCode === 0 &&
        resPay &&
        resPay.errCode === 0 &&
        resPro &&
        resPro.errCode === 0 &&
        resSpe &&
        resSpe.errCode === 0
      ) {
        let data = {
          resPri: resPri.data,
          resPay: resPay.data,
          resPro: resPro.data,
          resSpe: resSpe.data,
        };
        dispatch(fetchAllDetailDoctorSuccess(data));
      } else {
        dispatch(fetchAllDetailDoctorFail());
      }
    } catch (e) {
      dispatch(fetchAllDetailDoctorFail());
      console.log(e);
    }
  };
};
export const fetchAllDetailDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DETAIL_DOCTOR_SUCCESS,
  allDetailDoctor: data,
});
export const fetchAllDetailDoctorFail = () => ({
  type: actionTypes.FETCH_ALL_DETAIL_DOCTOR_FAIL,
});

export const saveDetailDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailInforDoctorApi(data);
      if (res && res.errCode === 0) {
        toast.success("Save info detail success!");

        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save info detail error!");
        console.log(res);
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
      });
      console.log(e);
    }
  };
};
