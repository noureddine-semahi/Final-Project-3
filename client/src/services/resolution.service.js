import http from "../http-common";

class ResolutionDataService {
  getAll() {
    return http.get("/resolutions");
  }

  get(id) {
    return http.get(`/resolutions/${id}`);
  }

  create(data) {
    return http.post("/resolutions", data);
  }

  update(id, data) {
    return http.put(`/resolutions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/resolutions/${id}`);
  }

  deleteAll() {
    return http.delete(`/resolutions`);
  }

  findByTitle(title) {
    return http.get(`/resolutions?title=${title}`);
  }

  //findAllAchieved(achieved) {
  //  return http.get(`/resolutions?achieved=${ true }`);
  //}
}

export default new ResolutionDataService();