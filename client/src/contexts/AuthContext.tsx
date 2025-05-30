import React, { createContext, useContext, useState, useEffect } from "react";

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name?: string; image?: string }) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  clearError: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local storage keys
const TOKEN_KEY = "ekkolabs_auth_token";
const USER_KEY = "ekkolabs_auth_user";

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initial state from local storage if available
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const user = localStorage.getItem(USER_KEY);

      return {
        token,
        user: user ? JSON.parse(user) : null,
        isLoading: false,
        error: null,
      };
    } catch (error) {
      return {
        token: null,
        user: null,
        isLoading: false,
        error: null,
      };
    }
  });

  // Derived states
  const isAuthenticated = !!authState.token && !!authState.user;
  const isAdmin = isAuthenticated && authState.user?.role === "ADMIN";

  // Save authentication state to local storage when it changes
  useEffect(() => {
    if (authState.token) {
      localStorage.setItem(TOKEN_KEY, authState.token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }

    if (authState.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(authState.user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [authState.token, authState.user]);

  // Login function
  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setAuthState({
        token: data.token,
        user: data.user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }));
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setAuthState({
        token: data.token,
        user: data.user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }));
    }
  };

  // Logout function
  const logout = () => {
    setAuthState({
      token: null,
      user: null,
      isLoading: false,
      error: null,
    });
  };

  // Update profile function
  const updateProfile = async (data: { name?: string; image?: string }) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Profile update failed");
      }

      setAuthState((prev) => ({
        ...prev,
        user: responseData.user,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }));
    }
  };

  // Change password function
  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password change failed");
      }

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }));
    }
  };

  // Clear error
  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        clearError,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Protected route component
export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  adminOnly?: boolean;
  fallback?: React.ReactNode;
}> = ({ children, adminOnly = false, fallback }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || (adminOnly && !isAdmin)) {
    return fallback || null;
  }

  return <>{children}</>;
};
