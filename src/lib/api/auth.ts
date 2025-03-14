import axios from "axios";
import { SignInSchemaType, SignUpSchemaType } from "@/lib/validations/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const toFormData = (
  data: Record<string, string | number | boolean | undefined>
): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value.toString());
    }
  });
  return formData;
};

export const registerUser = async (userData: SignUpSchemaType) => {
  const formData = toFormData({
    name: userData.nama,
    username: userData.username,
    email: userData.email,
    password: userData.password,
  });

  const response = await api.post("/api/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const loginUser = async (credentials: SignInSchemaType) => {
  const formData = toFormData({
    email: credentials.email,
    password: credentials.password,
  });

  const response = await api.post("/api/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await api.get("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const logoutUser = async (token: string) => {
  const response = await api.post(`/api/logout?token=${token}`);
  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await api.post(`/api/refresh?token=${token}`);
  return response.data;
};

