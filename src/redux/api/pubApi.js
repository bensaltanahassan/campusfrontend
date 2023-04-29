import axios from "axios";

const getAllPubs = async (id, token) => {
  return await axios.get(
    `https://campusapi-gljq.onrender.com/modules/${id}/pubs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const getAllFiles = async (id, token) => {
  return await axios.get(`https://campusapi-gljq.onrender.com/files/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSinglePub = async (pubId, token) => {
  return await axios.get(`https://campusapi-gljq.onrender.com/pub/${pubId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addPub = async ({ id, data, token }) => {
  return await axios.post(
    `https://campusapi-gljq.onrender.com/modules/${id}/pubs`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const downloadFile = async (id) => {
  return await axios.get(
    `https://campusapi-gljq.onrender.com/files/download/${id}`,
    {
      responseType: "blob",
    }
  );
};

export { getAllPubs, addPub, downloadFile, getSinglePub, getAllFiles };
