/* eslint-disable import/prefer-default-export */
export function authHeader() {
  // return authorization header with jwt token
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: token };
  }
  return {};
}
