"use client";

import { useEffect, useState } from "react";

import { TweetItem } from "../../app/(ui)/tweet/tweet-item";

export const ProfileFeed = () => {

  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {

    const loadTweets = async () => {

      try {

        const currentUser = JSON.parse(
          localStorage.getItem("user_data") || "{}"
        );

        const response = await fetch(
          `http://127.0.0.1:8000/api/feed/?user_id=${currentUser.id}`
        );

        const data = await response.json();

        // pega apenas tweets do usuário logado
        const myTweets = data.tweets.filter(
          (tweet: any) =>
            tweet.user?.username === currentUser.slug
        );

        setTweets(myTweets);

      } catch (error) {

        console.log(error);

      }

    };

    loadTweets();

  }, []);

  return (

    <div>

      {tweets.map((tweet) => (

        <TweetItem
          key={tweet.id}
          tweet={tweet}
        />

      ))}

    </div>

  );

};