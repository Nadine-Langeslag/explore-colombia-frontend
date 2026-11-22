import { request } from "./api.js";

// ---------- Register: Create a new account ----------
export async function registerUser(name, email, password) {
  const { data } = await request("/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  return data;
}

// ---------- Who is this person (with the token) ----------
export async function getCurrentUser(token) {
  const { data } = await request("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}

// ---------- Login: ask for the token ----------
export async function loginUser(email, password) {
  const { token } = await request("/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const user = await getCurrentUser(token);

  return { token, user };
}
