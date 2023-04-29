import axios from "axios";

// SignUp user
const signUp = async ({ data, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/teachers/register`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  } else {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/students/register`,
      data
    );
  }
};
// login Teacher
const login = async ({ email, password, cin, codeMassar, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/teachers/login`,
      {
        email,
        password,
      }
    );
  } else {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/students/login`,
      {
        cin,
        codeMassar,
        password,
      }
    );
  }
};

const forgetPassword = async ({ email, cin, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/teachers/forgetPassword`,
      {
        email,
      }
    );
  } else {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/students/forgetpassword`,
      {
        cin,
      }
    );
  }
};
const verifyCode = async ({ verifyCode, _id, userType }) => {
  if (userType === "Teacher") {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/teachers/verifyCode`,
      {
        verifyCode,
        teacherId: _id,
      }
    );
  } else {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/students/verifyCode`,
      {
        verifyCode,
        studentId: _id,
      }
    );
  }
};

const resetPassword = async ({ newPassword, userType, id }) => {
  if (userType === "Teacher") {
    return await axios.put(
      "https://campusapi-gljq.onrender.com/teachers/changepassword",
      {
        teacherId: id,
        password: newPassword,
      }
    );
  } else {
    return await axios.put(
      `https://campusapi-gljq.onrender.com/students/changepassword`,
      {
        studentId: id,
        password: newPassword,
      }
    );
  }
};

const updateTeacher = async ({ id, data, token }) => {
  return await axios.put(
    `https://campusapi-gljq.onrender.com/teachers/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const updateStudent = async ({ id, data, token }) => {
  return await axios.put(
    `https://campusapi-gljq.onrender.com/students/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const changeTeacherPicture = async ({ id, data, token }) => {
  return await axios.put(
    `https://campusapi-gljq.onrender.com/teachers/${id}/image`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const resendCode = async (receive, userType) => {
  if (userType === "Teacher") {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/teachers/resendCode`,
      {
        email: receive,
      }
    );
  } else {
    return await axios.post(
      `https://campusapi-gljq.onrender.com/students/resendCode`,
      {
        phoneNumber: receive,
      }
    );
  }
};

export {
  signUp,
  login,
  forgetPassword,
  verifyCode,
  resetPassword,
  updateTeacher,
  updateStudent,
  changeTeacherPicture,
  resendCode,
};
