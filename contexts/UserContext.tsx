import React, {useContext, useState} from 'react';
import {AuthService} from 'services/AuthService';

export class AccountConflictError {}

export class AuthenticationFailedError {}

interface ContextValueType {
  signup: (
    userName: string,
    password: string,
  ) => Promise<void | AccountConflictError>;
  login: (
    userName: string,
    password: string,
  ) => Promise<void | AuthenticationFailedError>;
  logout: () => Promise<void>;
  userName: string;
  isLoggedIn: boolean;
}

export const UserContext = React.createContext<ContextValueType>(
  {} as ContextValueType,
);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string>('');

  const contextValue: ContextValueType = {
    signup: async (userName, password) => {
      await AuthService.signup(userName, password);
    },
    login: async (userName, password) => {
      await AuthService.login(userName, password);
      await AuthService.refreshCsrfToken();
      setUserName(userName);
    },
    logout: async () => {
      await AuthService.logout();
      await AuthService.refreshCsrfToken();
      setUserName('');
    },
    userName,
    isLoggedIn: userName !== '',
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
