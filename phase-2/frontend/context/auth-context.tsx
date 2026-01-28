import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextType {
  state: AuthState;
  login: (token: string, user: User) => Promise<void>;
  logout: () => void;
  signup: (token: string, user: User) => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'RESTORE_SESSION':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!action.payload.token,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token: string, user: User): Promise<void> => {
    return new Promise((resolve) => {
      // Update auth context state first
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, user },
      });

      // Use setTimeout to ensure state update happens before continuing
      setTimeout(() => {
        try {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', JSON.stringify(user));
          resolve();
        } catch (error) {
          console.error('Error saving auth data to localStorage:', error);
          // If localStorage fails, logout to prevent inconsistent state
          logout();
          resolve();
        }
      }, 0);
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    dispatch({
      type: 'LOGOUT',
    });
  };

  const signup = (token: string, user: User): Promise<void> => {
    return new Promise((resolve) => {
      // Update auth context state first
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, user },
      });

      // Use setTimeout to ensure state update happens before continuing
      setTimeout(() => {
        try {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', JSON.stringify(user));
          resolve();
        } catch (error) {
          console.error('Error saving auth data to localStorage:', error);
          // If localStorage fails, logout to prevent inconsistent state
          logout();
          resolve();
        }
      }, 0);
    });
  };

  // Restore session on initial load
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch({
          type: 'RESTORE_SESSION',
          payload: { token, user },
        });
      } catch (error) {
        console.error('Error restoring session:', error);
        dispatch({
          type: 'LOGOUT',
        });
      }
    } else {
      dispatch({
        type: 'RESTORE_SESSION',
        payload: { token: null, user: null },
      });
    }
  }, []);

  const value = {
    state,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};