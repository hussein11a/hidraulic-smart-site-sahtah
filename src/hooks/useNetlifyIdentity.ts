
import { useState, useEffect } from 'react';

interface NetlifyUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  app_metadata: {
    roles?: string[];
  };
}

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export const useNetlifyIdentity = () => {
  const [user, setUser] = useState<NetlifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initIdentity = () => {
      if (window.netlifyIdentity) {
        const currentUser = window.netlifyIdentity.currentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
        setIsLoading(false);

        // Event listeners
        window.netlifyIdentity.on('init', (user: NetlifyUser | null) => {
          if (user) {
            setUser(user);
            setIsAuthenticated(true);
          }
          setIsLoading(false);
        });

        window.netlifyIdentity.on('login', (user: NetlifyUser) => {
          setUser(user);
          setIsAuthenticated(true);
        });

        window.netlifyIdentity.on('logout', () => {
          setUser(null);
          setIsAuthenticated(false);
        });
      }
    };

    if (window.netlifyIdentity) {
      initIdentity();
    } else {
      // Wait for script to load
      const interval = setInterval(() => {
        if (window.netlifyIdentity) {
          initIdentity();
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  const login = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    }
  };

  const signup = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('signup');
    }
  };

  const logout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  const hasRole = (role: string): boolean => {
    return user?.app_metadata?.roles?.includes(role) || false;
  };

  const getUserMetadata = (key: string): any => {
    return user?.user_metadata?.[key];
  };

  const getAppMetadata = (key: string): any => {
    return user?.app_metadata?.[key];
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    hasRole,
    getUserMetadata,
    getAppMetadata,
  };
};
