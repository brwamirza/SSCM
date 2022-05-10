import http from "../http-common";
class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  async create(data) {
    const response = await http.post("/users",data);
    if (response.data.accessToken) {
      localStorage.setItem("token_id", JSON.stringify(response.data));

      return response.data;
    }
  }

  verifyEmail(token) {
    return http.put(`/users/verify/${token}`);
  }

  async signin(data) {
    const response = await http.post("/users/signin", {
      data
    });
    if (response.data.accessToken) {
      localStorage.setItem("token_id", JSON.stringify(response.data));
    }
    return response.data;
  }
  
  //remove token from local storage
  logout() {
    localStorage.removeItem("token_id");
  }
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
  delete(id) {
    return http.delete(`/users/${id}`);
  }
  deleteAll() {
    return http.delete(`/users`);
  }
//   used for searching
//   findByTitle(title) {
//     return http.get(`/users?title=${title}`);
//   }
}
export default new UserDataService();