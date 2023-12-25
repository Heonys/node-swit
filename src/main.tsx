import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TweetService from "./service/tweet.ts";
import { AuthErrorEventBus, AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./service/auth.ts";
import { HttpClient } from "./client/http.ts";
import TokenStorage from "./db/token.ts";
import Socket from "./client/socket.ts";

const baseURL: string = import.meta.env.VITE_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const tokenStorage = new TokenStorage();
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const authService = new AuthService(httpClient, tokenStorage);
const tweetService = new TweetService(httpClient, tokenStorage, socketClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider authErrorEventBus={authErrorEventBus} authService={authService}>
      <App tweetService={tweetService} />
    </AuthProvider>
  </BrowserRouter>
);
