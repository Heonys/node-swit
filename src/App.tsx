// import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import type TweetService from "./service/tweet";
import "./App.css";
import AllTweets from "./pages/AllTweets";
import MyTweets from "./pages/MyTweets";
import Header from "./components/Header";

type Props = {
  tweetService: TweetService;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function App({ tweetService }: Props) {
  return (
    <>
      <Header />
      <Switch>
        (
        <>
          <Route exact path="/">
            <AllTweets tweetService={tweetService} />
          </Route>
          <Route exact path="/:username">
            <MyTweets tweetService={tweetService} />
          </Route>
        </>
        )
      </Switch>
    </>
  );
}

export default App;
