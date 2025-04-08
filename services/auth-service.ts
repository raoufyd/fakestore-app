import type { User, UserRole } from "@/context/auth-context";

const API_URL = "https://fakestoreapi.com";

export async function loginUser(
  username: string,
  password: string
): Promise<User> {
  // Tentative d'authentification via l'API
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Login failed with status: ${response.status}`);
  }

  const apiResponse = await response.json();

  if (!apiResponse?.token) {
    throw new Error("Authentication failed: no token received");
  }

  // Récupérer les détails de l'utilisateur après authentification
  const userResponse = await fetch(`${API_URL}/users`);
  if (!userResponse.ok) {
    throw new Error(`Failed to fetch user details: ${userResponse.status}`);
  }

  const users = await userResponse.json();

  // Trouver l'utilisateur correspondant au nom d'utilisateur
  const userInfo = users.find((user: any) => user.username === username);

  if (!userInfo) {
    throw new Error("User not found");
  }

  // Attribuer un rôle en fonction de l'ID de l'utilisateur
  const role: UserRole = userInfo.id === 1 ? "admin" : "client";

  // Créer un objet utilisateur avec le token et les informations de l'utilisateur
  return {
    ...userInfo,
    token: apiResponse.token,
    role,
  };
}
