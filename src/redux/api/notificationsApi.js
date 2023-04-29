import axios from "axios";

const getNotifications = async (token) => {
  return await axios.get(`https://campusapi-gljq.onrender.com/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const readNotification = async (notificationId, token) => {
  return await axios.put(
    `https://campusapi-gljq.onrender.com/notifications/${notificationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { getNotifications, readNotification };
