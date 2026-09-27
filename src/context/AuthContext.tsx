import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, User } from '../types';
import { mockPatient, mockCaregiver } from '../data/mockData';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  user: User | null;
  loginWithOTP: (phone: string, otp: string) => boolean;
  selectRole: (role: UserRole) => void;
  switchRole: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('hg_auth') === 'true';
  });

  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    const role = localStorage.getItem('hg_role');
    if (role === 'patient' || role === 'caregiver') return role;
    return 'patient'; // Default to patient for demo
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('hg_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // fallback
      }
    }
    return {
      id: mockPatient.id,
      phone: mockPatient.phone,
      role: 'patient',
      name: mockPatient.name,
      avatarUrl: mockPatient.avatarUrl,
    };
  });

  useEffect(() => {
    localStorage.setItem('hg_auth', isAuthenticated ? 'true' : 'false');
    if (userRole) localStorage.setItem('hg_role', userRole);
    if (user) localStorage.setItem('hg_user', JSON.stringify(user));
  }, [isAuthenticated, userRole, user]);

  const loginWithOTP = (_phone: string, otp: string): boolean => {
    if (otp === '123456') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const selectRole = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    if (role === 'patient') {
      setUser({
        id: mockPatient.id,
        phone: mockPatient.phone,
        role: 'patient',
        name: mockPatient.name,
        avatarUrl: mockPatient.avatarUrl,
      });
    } else {
      setUser({
        id: mockCaregiver.id,
        phone: mockCaregiver.phone,
        role: 'caregiver',
        name: mockCaregiver.name,
        avatarUrl: mockCaregiver.avatarUrl,
      });
    }
  };

  const switchRole = () => {
    const newRole: UserRole = userRole === 'patient' ? 'caregiver' : 'patient';
    selectRole(newRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUser(null);
    localStorage.removeItem('hg_auth');
    localStorage.removeItem('hg_role');
    localStorage.removeItem('hg_user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        user,
        loginWithOTP,
        selectRole,
        switchRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
