import { getUserById, loginUser } from '../../helpers/userAuth';
import { checkinCredentials, login, logout } from './authSlice';

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkinCredentials());
  };
};
export const startLogin = (user) => {
  return async (dispatch) => {
    dispatch(checkinCredentials());
    const { ok, uid, token, errorMessage } = await loginUser(user);
    if (!ok) return dispatch(logout({ errorMessage }));
    const { email, name, role } = await getUserById(uid, token);
    dispatch(login({ uid, token, email, name, role, errorMessage }));
  };
};
