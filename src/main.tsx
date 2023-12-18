import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import TweetService from "./service/tweet.ts";
import { AuthProvider } from "./context/AuthContext.tsx";

// const baseURL = process.env.REACT_APP_BASE_URL!;
const baseURL = "http://localhost:8080";
const tweetService = new TweetService(baseURL);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
