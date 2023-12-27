import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TweetService from "./service/tweet.ts";
import { AuthErrorEventBus, AuthProvider, fetchToken, fetchCsrfToken } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./service/auth.ts";
import { HttpClient } from "./client/http.ts";
import Socket from "./client/socket.ts";

const baseURL: string = import.meta.env.VITE_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus, () => fetchCsrfToken());
const socketClient = new Socket(baseURL, () => fetchToken());
const authService = new AuthService(httpClient);
const tweetService = new TweetService(httpClient, socketClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider authErrorEventBus={authErrorEventBus} authService={authService}>
      <App tweetService={tweetService} />
    </AuthProvider>
  </BrowserRouter>
);
