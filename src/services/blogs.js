import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(
    `http://localhost:3001/api/blogs/` + id,
    config
  );
  return response.data;
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};
const update = async (newObject) => {
  const response = await axios.put(`http://localhost:3001/api/blogs/${newObject.id}`, newObject);
  return response.data;
};
const createComment = async(thing)=>{
  const response = await axios.post(`http://localhost:3001/api/blogs/${thing.id}/comments`,{comment:thing.comment})
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove,createComment };
