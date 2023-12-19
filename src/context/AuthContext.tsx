import type AuthService from "@/service/auth";
import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
  authService: AuthService;
  authErrorEventBus: AuthErrorEventBus;
};

type LoginInfo = {
  username: string;
  token: string;
};

const defaultValur = {
  user: { username: "", token: "" },
  signUp: () => {},
  logIn: () => {},
  logout: () => {},
};

const AuthContext = createContext<any>(defaultValur);
const contextRef = createRef();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AuthProvider = ({ authService, authErrorEventBus, children }: Props) => {
  const [user, setUser] = useState<LoginInfo>();

  useImperativeHandle(contextRef, () => (user ? user.token : undefined));

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (username: string, password: string, name: string, email: string, url: string) =>
      authService.signup(username, password, name, email, url).then((user) => setUser(user)),
    [authService]
  );

  const logIn = useCallback(
    async (username: string, password: string) => authService.login(username, password).then((user) => setUser(user)),
    [authService]
  );

  const logout = useCallback(async () => authService.logout().then(() => setUser(undefined)), [authService]);

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn, logout]
  );

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const fetchToken = () => contextRef.current;

type Callback = (...args: unknown[]) => unknown;

export class AuthErrorEventBus {
  callback?: Callback;
  listen(callback: Callback) {
    this.callback = callback;
  }
  notify(error: string) {
    this.callback!(error);
  }
}
