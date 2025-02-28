export interface Credentials {
    username: string;
    password: string;
  }
  
  export interface SignUpData {
    username: string;
    email: string;
    password: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    token?: string;
  }
  
  export interface AuthResponse {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    token: string;
  }
  
  export interface SignInFormInput {
    email: string;
    password: string;
  }
  
  export interface SignUpFormInput {
    nama: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }