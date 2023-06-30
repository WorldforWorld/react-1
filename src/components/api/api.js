import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "58afebe8-4e8c-4886-8974-63153cef0c89",
  },
});
export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  },
  follow(userId) {
    return instance.post(`follow/${userId}`).then(response => response.data);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`).then(response => response.data);
  },
  getProfile(userId) {
    return instance.get(`profile/${userId}`);
  },
};
export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },
};
