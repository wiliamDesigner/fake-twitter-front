"use client";

import { useEffect, useState } from "react";

import { TweetItem } from "../../app/(ui)/tweet/tweet-item";

export const HomeFeed = () => {

  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {

    const loadFeed = async () => {

      try {

        // USUÁRIO LOGADO
        const currentUser = JSON.parse(
          localStorage.getItem("user_data") || "{}"
        );

        const userId = currentUser.id;

        // BUSCA FEED
        const res = await fetch(
          `http://127.0.0.1:8000/api/feed/?user_id=${userId}`
        );

        const data = await res.json();

        console.log("FEED:", data);

        // MOSTRA TODOS OS TWEETS
        setTweets(data.tweets || []);

      } catch (err) {

        console.error("ERRO:", err);

      }

    };

    loadFeed();

  }, []);

  return (

    <div>

      {tweets.map((tweet: any) => (

        <TweetItem
          key={tweet.id}
          tweet={tweet}
        />

      ))}

    </div>

  );

};