export const pages = {
  welcome: "/",
  login: "/login",
  loginSuccess: "/login-success",
  register: "/register",
  registerSuccess: "/register-success",
  usersList: "/users",
  docList: "/doclist",
  groupChat: "/groupchat",
  editUser: "/edit-user",
  logout: "/logout",
  share: "/share",
};

export const regex = {
  email:
    // eslint-disable-next-line
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};

export const server = {
  communicationsAPI: "http://localhost:3001",
  app: "http://localhost:3000",
};

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

/**
 * Logout - removes session user id
 */
export function logout() {
  document.cookie = `token=;`;
  window.href = pages.logout;
}

/**
 * Get user object from localStorage by user ID
 * @param {Number} id
 * @param {Array} usersArray
 *
 * @returns {Object}
 */
export function getUserObjectbyId(id, usersArray) {
  const userObject = usersArray.find((user) => user.id === id);

  return userObject;
}

export const guardedPages = Object.entries(pages)
  .filter(([page, value]) => {
    return (
      value !== pages.welcome &&
      value !== pages.login &&
      value !== pages.register &&
      value !== pages.logout &&
      value !== pages.registerSuccess
    );
  })
  .map((pages) => pages[1]);
