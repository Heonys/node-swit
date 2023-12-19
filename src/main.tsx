import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import TweetService from "./service/tweet.ts";
import { AuthErrorEventBus, AuthProvider } from "./context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./service/auth.ts";

// const baseURL = process.env.REACT_APP_BASE_URL!;
const baseURL = "http://localhost:8080";
const tweetService = new TweetService(baseURL);
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider authErrorEventBus={authErrorEventBus} authService={authService}>
      <App tweetService={tweetService} />
    </AuthProvider>
  </BrowserRouter>
);
