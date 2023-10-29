import httpService from "./httpService";

//Get Current User
export async function fetchCurrentUser(token_header) {
  let fetchedUser = await httpService
    .get(`/users/me`, token_header)
    .then((response) => response.data);
  return fetchedUser;
}

//Create User / Sign Up
export async function createUser(user) {
  await httpService
    .post("/users", {
      "name": user.name,
      "email": user.email,
      "password": user.password,
    })
    .then((response) => response.data);
}

//User Login
export async function loginUser(user) {
  const token = await httpService
    .post("/users/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => response.data.token);
  return token;
}

//Edit User
export async function editUser(userId, editedUser, token_header) {
  await httpService
    .put(`/users/${userId}`, editedUser, token_header)
    .then((response) => response.data);
}

//Edit User - Upload Avatar Image
export async function uploadUserAvatar(userId, avatar, headers) {
  await httpService
    .put(`/users/upload/${userId}`, { "avatar": avatar }, headers)
    .then((response) => response.data);
}

//Delete User
export async function deleteUser(userId, token_header) {
  const deletedUser = await httpService
    .delete(`/users/${userId}`, token_header)
    .then((response) => response.data);
  return deletedUser;
}

//Get All Users (Admin)
export async function getAllUsers(usersQuery, token_header) {
  const allUsers = await httpService
    .get(`/users${usersQuery}`, token_header)
    .then((response) => response.data);
  return allUsers;
}

//Change isAdmin Status (Admin)
export async function changeIsAdmin(userId, newStatus, token_header) {
  await httpService.patch(
    `/users/isAdmin/${userId}`,
    { "isAdmin": newStatus },
    token_header
  );
}

//Forgot Password
export async function forgotPass(email) {
  await httpService.post("/users/forgot-password", {
    "email": email,
  });
}

//Reset Password
export async function resetPass(newPassword, token) {
  await httpService.post(
    "/users/reset-password",
    { "password": newPassword },
    { headers: { "x-auth-token": token } }
  );
}
