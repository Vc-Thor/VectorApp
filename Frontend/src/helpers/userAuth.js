import {
  axiosAreaVector,
  axiosAuth,
  axiosUser,
  axiosVector,
  axiosVectorValue,
} from './api';
import JWT from 'jwt-decode';

export const registerUser = async (user = null) => {
  if (!user) return;
  try {
    const { data } = await axiosUser.post('/addUser', user);
    const { msg } = await data;
    return {
      ok: true,
      msg,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response.data?.msg || response.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const loginUser = async (user = null) => {
  if (!user) return;
  try {
    const { data } = await axiosAuth.post('/login', user);
    const { token } = await data;
    const { uid } = JWT(token);
    return {
      ok: true,
      uid,
      token,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response.data?.msg || response.data.errors[0]?.msg;
    return { ok: false, errorMessage };
  }
};
export const getUserById = async (uid = null, token = null) => {
  if (!uid && !token) return;
  try {
    const { data } = await axiosUser.get(`/${uid}`, {
      headers: { 'x-token': token },
    });
    const { email, name, role } = data;
    return {
      ok: true,
      email,
      name,
      role,
      token,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response.data.msg || response.data.errors[0]?.msg;
    return { ok: false, errorMessage };
  }
};
export const getVectors = async (token = null) => {
  if (!token) return;
  try {
    const { data } = await axiosVector.get('/getVectors', {
      headers: { 'x-token': token },
    });
    const { total, vectors } = data;
    const { name, activity, area, position } = data.vectors;
    return {
      ok: true,
      total,
      name,
      activity,
      area,
      vectors,
      position,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response?.data.msg || response?.data.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const getVectorsValue = async (token = null) => {
  if (!token) return;
  try {
    const { data } = await axiosVectorValue.get('/getValues', {
      headers: { 'x-token': token },
    });
    const { total, valueVectors } = data;
    return {
      ok: true,
      total,
      valueVectors,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response?.data?.msg || response?.data.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const putValueVector = async (id = null, valor = null, token = null) => {
  if (!id && !valor && !token) return;
  try {
    const { data } = await axiosVectorValue.put(`/${id}`, valor, {
      headers: { 'x-token': token },
    });
    const { msg } = data;
    return {
      ok: true,
      msg,
    };
  } catch (err) {
    const { response } = err;
    console.log(err);
    const errorMessage = response.data.msg || response.data.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const postVector = async (vector = null, token = null) => {
  if (!vector && !token) return;
  console.log(vector && token);
  try {
    const { data } = await axiosVector.post('/addVector', vector, {
      headers: { 'x-token': token },
    });
    const { msg } = data;
    console.log(data);
    const { _id, activity, area, name, user, position } = data.vector;
    return {
      ok: true,
      msg,
      _id,
      activity,
      area,
      name,
      user,
      position,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response.data.msg || response.data.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const putVector = async (uid = null, token = null, vectorUp = null) => {
  if (!uid && !token && !vectorUp) return;
  try {
    const { data } = await axiosVector.put(`/${uid}`, vectorUp, {
      headers: { 'x-token': token },
    });
    const { msg } = data;
    return {
      ok: true,
      msg,
    };
  } catch (err) {
    const { response } = err;
    console.log(err);
    const errorMessage = response?.data?.msg || response?.data?.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const deleteVector = async (token = null, id = null) => {
  if (!token && !id) return;
  try {
    const { data } = await axiosVector.delete(`/${id}`, {
      headers: { 'x-token': token },
    });
    const { msg } = data;
    return {
      ok: true,
      msg,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response.data.msg || response.data.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const postValueVector = async (valueVector = null, token = null) => {
  if (!valueVector && !token) return;
  try {
    const { data } = await axiosVectorValue.post(
      '/addValueVector',
      valueVector,
      {
        headers: { 'x-token': token },
      },
    );
    const { msg } = data;
    console.log(data);
    const { position, period, value, vector, _id } = data.valueV;
    return {
      ok: true,
      msg,
      position,
      period,
      value,
      vector,
      _id,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response.data?.msg || response.data.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const getValueVectorById = async (token = null, id = null) => {
  if (!token && !id) return;
  try {
    const { data } = await axiosVectorValue.get(`/${id}`, {
      headers: { 'x-token': token },
    });
    const { total, valueVectors } = data;
    return {
      ok: true,
      total,
      valueVectors,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response?.data?.msg || response?.data.errors[0]?.msg;
    return {
      ok: false,
      errorMessage,
    };
  }
};
export const postAreaVector = async (token = null, areaVector = null) => {
  if (!token && !areaVector) return;
  try {
    const { data } = await axiosAreaVector.post('/addArea', areaVector, {
      headers: { 'x-token': token },
    });
    const { areaV, msg } = data;
    return {
      ok: true,
      msg,
      areaV,
    };
  } catch (err) {
    const { response } = err;
    const errorMessage = response?.data?.msg || response?.data.errors[0]?.msg;
    console.log(errorMessage);
    return {
      ok: false,
      errorMessage,
    };
  }
};
