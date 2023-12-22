import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TweetService from "./service/tweet.ts";
import { AuthErrorEventBus, AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./service/auth.ts";
import { HttpClient } from "./client/http.ts";

const baseURL = import.meta.env.VITE_BASE_URL;
const httpClient = new HttpClient(baseURL);
const tweetService = new TweetService(httpClient);
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider authErrorEventBus={authErrorEventBus} authService={authService}>
      <App tweetService={tweetService} />
    </AuthProvider>
  </BrowserRouter>
);
