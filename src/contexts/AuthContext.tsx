import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  phoneNumber: string;
  // Add more user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phoneNumber: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('https://zerointel.io/api/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status !== false) {
        setUser({ phoneNumber });
        localStorage.setItem('user', JSON.stringify({ phoneNumber }));
        return true;
      } else {
        // Handle API error response
        const errorMessage = data.message || 'Login failed';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw to handle in the component
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 