// frontend/src/services/forumService.js
import api from "../api/api";

const forumService = {
  getPosts: (sort = "newest") => api.get(`/forum/posts?sort=${sort}`).then(res => res.data),
  getPost: (id) => api.get(`/forum/posts/${id}`).then(res => res.data),
  createPost: (data) => api.post("/forum/posts", data).then(res => res.data),
  createComment: (data) => api.post("/forum/comments", data).then(res => res.data),
  votePost: (id, up = true) => api.post(`/forum/posts/${id}/vote?up=${up}`).then(res => res.data),
  voteComment: (id, up = true) => api.post(`/forum/comments/${id}/vote?up=${up}`).then(res => res.data),
};

export default forumService;
