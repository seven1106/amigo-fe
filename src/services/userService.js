import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUserApi = (inputId) => {
  return axios.get(`/api/get-list-user?id=${inputId}`);
};
const getAllCodeApi = (inputId) => {
  return axios.get(`/api/get-all-code?type=${inputId}`);
};
const createNewUserApi = (data) => {
  return axios.post(`/api/create-new-user`, data);
};
const editUserApi = (data) => {
  return axios.put(`/api/edit-user`, data);
};
const deleteUserApi = (userId) => {
  return axios.delete(`/api/delete-user?id=${userId}`);
};
const getTopDoctorHomeApi = (limitInput) => {
  return axios.get(`/api/get-top-doctor-home?limit=${limitInput}`);
};
const getAllDoctorsApi = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailInforDoctorApi = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};
const getDetailInforDoctorApi = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
const bulkCreateScheduleApi = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleDoctorByIdApi = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraDoctorInfoByIdApi = (doctorId) => {
  return axios.get(`/api/get-extra-doctor-info-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorByIdApi = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postBookAppointmentApi = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyBookingApi = (data) => {
  return axios.post(`/api/verify-booking`, data);
};
const postCreateSpecialtyApi = (data) => {
  return axios.post(`/api/create-specialty`, data);
};
const getAllSpecialtyApi = () => {
  return axios.get(`/api/get-all-specialty`);
};
const getDetailSpecialtyByIdApi = (id) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${id}`);
};
const postCreateClinicApi = (data) => {
  return axios.post(`/api/create-clinic`, data);
};
const getAllClinicApi = () => {
  return axios.get(`/api/get-all-clinic`);
};
const getDetailClinicByIdApi = (id) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
};
const getAppointmentByDateApi = (doctorId, date) => {
  return axios.get(
    `/api/get-appointment-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const completeAppointmentApi = (data, type) => {
  return axios.post(`/api/completed-appointment`, { data: data, type: type });
};

export {
  completeAppointmentApi,
  getAppointmentByDateApi,
  handleLoginApi,
  postBookAppointmentApi,
  getAllUserApi,
  createNewUserApi,
  editUserApi,
  deleteUserApi,
  getAllCodeApi,
  getTopDoctorHomeApi,
  getAllDoctorsApi,
  saveDetailInforDoctorApi,
  getDetailInforDoctorApi,
  bulkCreateScheduleApi,
  getScheduleDoctorByIdApi,
  getExtraDoctorInfoByIdApi,
  getProfileDoctorByIdApi,
  postVerifyBookingApi,
  postCreateClinicApi,
  getDetailClinicByIdApi,
  getAllClinicApi,
  postCreateSpecialtyApi,
  getDetailSpecialtyByIdApi,
  getAllSpecialtyApi,
};
