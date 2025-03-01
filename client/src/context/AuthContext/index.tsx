import React from "react";
import { IQuestionData } from "../../Backend/model/Question-model";
import { Error, Sucess } from '../../components/Alert';
import { useHook } from "./hooks";

const AuthContext = React.createContext<{
  authState: any;
  loginWithRedirect?: (payload: {
    username: string;
    password: string;
  }) => Promise<void>;
  signupWithRedirect?(payload: {
    username: string;
    password: string;
    allQuestionsData: IQuestionData[]
  }): Promise<void>;
}>({ authState: {} });

export const useAuth = () => React.useContext(AuthContext);

interface AuthProviderProps {
    children: any;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}: AuthProviderProps) => {
    const {authState, dispatch, dismiss, loginWithRedirect, signupWithRedirect} = useHook();
    return (
        <AuthContext.Provider
            value={{authState, loginWithRedirect, signupWithRedirect}}
        >
            <Error error={authState.error}/>
            <Sucess message={authState.message}/>
            {children}
        </AuthContext.Provider>
    );
};
