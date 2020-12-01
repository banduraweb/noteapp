export const loggedIn = () => {
  const key = localStorage.getItem('token');
  if (key) return true;
  return false;
};
