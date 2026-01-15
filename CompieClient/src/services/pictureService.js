import api from "../api/axiosInstance";

const pictureService = {
  getAll: (search = "", pageNumber = 1, pageSize = 8) => {
    let url = `/api/Picture?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (search) {
      url += `&search=${search}`;
    }
    return api.get(url);
  },
  getById: (id) => {
    return api.get(`/api/Picture/${id}`);
  },
  getMessages: (id) => {
    return api.get(`/api/picture/${id}/messages`);
  },
};

export default pictureService;
