import createHistory from 'history/createBrowserHistory';
const history = createHistory({
  forceRefresh: true
 });

export const TOKEN_KEY = "@axreg-Token";
export const USER_PROFILE = "@axreg-Profile";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getProfile = () => localStorage.getItem(USER_PROFILE);


export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const login = (token,objProfile) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_PROFILE, objProfile);
  
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_PROFILE);
  history.push('/login');
};