import api from "../api";

export const getPosts = async () => {
    try {
      const res = await api.get('posts/');
      return res.data
    } catch (error) {
      console.log(error.message)
    }
};

export const getAccessToken = async (data) => {
  try {
    const res = await api.post('auth/', data);
    return res.data
  } catch (error) {
    console.log(error.message)
  }
};

export const getUsername = async () => {
  try {
    const res = await api.get('user/get-username/');
    return res.data
  } catch (error) {
    console.log(error.message)
  }
};
