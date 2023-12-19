/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import type TweetService from "./service/tweet";
import "./App.css";
import AllTweets from "./pages/AllTweets";
import MyTweets from "./pages/MyTweets";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  tweetService: TweetService;
};

function App({ tweetService }: Props) {
  // @ts-ignore
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <>
      {user && <Header username={user.username} onLogout={onLogout} />}
      <Routes>
        <Route path="/" element={<AllTweets tweetService={tweetService} />}></Route>
        <Route path="/:username" element={<MyTweets tweetService={tweetService} />}></Route>
      </Routes>
    </>
  );
}

export default App;
