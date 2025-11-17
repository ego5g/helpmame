'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;
  googleSignIn: () => Promise<void>;
  emailSignUp: (email: string, password: string) => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  googleSignIn: async () => {},
  emailSignUp: async () => {},
  emailSignIn: async () => {},
  logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    setUser({
        uid: '12345',
        email: 'testuser@test.com',
        displayName: 'Test User',
    });
  }, []);

  const googleSignIn = async () => {
    console.log("googleSignIn is disabled");
  };
  const emailSignUp = async (email: string, password: string) => {
    console.log("emailSignUp is disabled");
  };
  const emailSignIn = async (email: string, password: string) => {
    console.log("emailSignIn is disabled");
  };
  const logOut = () => {
    console.log("logOut is disabled");
    setUser(null);
  };

  const value = { user, googleSignIn, emailSignUp, emailSignIn, logOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
