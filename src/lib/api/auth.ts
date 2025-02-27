import { AuthResponse, Credentials, SignUpData, User } from '@/types/auth';

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Sign in a user using the DummyJSON API
 * @param {Credentials} credentials - User credentials
 * @returns {Promise<AuthResponse>} User data and token
 */
export const signIn = async (credentials: Credentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign in');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An error occurred during sign in');
    }
    throw new Error('An unexpected error occurred during sign in');
  }
};

/**
 * Sign up a new user using the DummyJSON API
 * @param {SignUpData} userData - User data for registration
 * @returns {Promise<User>} New user data
 */
export const signUp = async (userData: SignUpData): Promise<User> => {
  try {
    // DummyJSON doesn't have a proper sign-up endpoint, so we use the add user endpoint
    const response = await fetch(`${API_BASE_URL}/users/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An error occurred during sign up');
    }
    throw new Error('An unexpected error occurred during sign up');
  }
};

/**
 * Get current user data
 * @param {string} token - JWT token
 * @returns {Promise<User>} User data
 */
export const getCurrentUser = async (token: string): Promise<User> => {
  try {
    // DummyJSON doesn't have a proper current user endpoint, so we simulate it
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user data');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An error occurred while fetching user data');
    }
    throw new Error('An unexpected error occurred while fetching user data');
  }
};