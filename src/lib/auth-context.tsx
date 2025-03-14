import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  getUserProfile,
  logoutUser,
  refreshToken,
} from "@/lib/api/auth";
import { SignInSchemaType, SignUpSchemaType } from "@/lib/validations/auth";
import Cookies from "js-cookie";

const ACCESS_TOKEN_COOKIE = "auth_token";
const TOKEN_EXPIRY_COOKIE = "token_expiry";
const USER_COOKIE = "user_data";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
};

type AuthContextType = AuthState & {
  login: (credentials: SignInSchemaType) => Promise<void>;
  register: (userData: SignUpSchemaType) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const initialize = async () => {
      const token = Cookies.get(ACCESS_TOKEN_COOKIE);
      const userData = Cookies.get(USER_COOKIE);

      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          setupTokenRefresh(token);
        } catch (error) {
          clearAuthCookies();
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: error as Error,
          });
        }
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initialize();
  }, []);

  const setupTokenRefresh = (token: string) => {
    const expiryTime = Cookies.get(TOKEN_EXPIRY_COOKIE);
    if (!expiryTime) return;

    const expiryDate = new Date(expiryTime);
    const now = new Date();

    if (expiryDate.getTime() - now.getTime() < 5 * 60 * 1000) {
      refreshAuthToken(token);
    } else {
      const timeToRefresh =
        expiryDate.getTime() - now.getTime() - 5 * 60 * 1000;
      setTimeout(() => refreshAuthToken(token), timeToRefresh);
    }
  };

  const refreshAuthToken = async (token: string) => {
    try {
      const response = await refreshToken(token);
      setAuthCookies(response.access_token, response.expires_in);

      setupTokenRefresh(response.access_token);
    } catch (error) {
      clearAuthCookies();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error as Error,
      });
      router.push("/login");
    }
  };

  const setAuthCookies = (
    token: string,
    expiresIn: number,
    userData?: User
  ) => {
    const expiryDate = new Date(new Date().getTime() + expiresIn * 1000);
    Cookies.set(ACCESS_TOKEN_COOKIE, token, {
      expires: expiresIn / 86400,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set(TOKEN_EXPIRY_COOKIE, expiryDate.toISOString(), {
      expires: expiresIn / 86400,
      secure: true,
      sameSite: "strict",
    });

    if (userData) {
      Cookies.set(USER_COOKIE, JSON.stringify(userData), {
        expires: expiresIn / 86400,
        secure: true,
        sameSite: "strict",
      });
    }
  };

  const clearAuthCookies = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(TOKEN_EXPIRY_COOKIE);
    Cookies.remove(USER_COOKIE);
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        const token = data.access_token;
        const expiresIn = data.expires_in;
        const userProfile = await getUserProfile(token);

        setAuthState({
          user: userProfile,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        setAuthCookies(token, expiresIn, userProfile);
        setupTokenRefresh(token);
        router.push("/");
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          error: error as Error,
          isLoading: false,
        }));
      }
    },
    onError: (error) => {
      setAuthState((prev) => ({
        ...prev,
        error: error as Error,
        isLoading: false,
      }));
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
      router.push("/login");
    },
    onError: (error) => {
      setAuthState((prev) => ({
        ...prev,
        error: error as Error,
        isLoading: false,
      }));
    },
    onSettled: () => {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      const token = Cookies.get(ACCESS_TOKEN_COOKIE);
      return token
        ? logoutUser(token)
        : Promise.resolve({ message: "No token found" });
    },
    onSuccess: () => {
      clearAuthCookies();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      queryClient.clear();
      router.push("/login");
    },
    onError: (error) => {
      clearAuthCookies();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error as Error,
      });
      router.push("/login");
    },
    onSettled: () => {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    },
  });

  const login = async (credentials: SignInSchemaType) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      await loginMutation.mutateAsync(credentials);
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      throw error;
    }
  };

  const register = async (userData: SignUpSchemaType) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      await registerMutation.mutateAsync(userData);
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      await logoutMutation.mutateAsync();
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
      throw error;
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
