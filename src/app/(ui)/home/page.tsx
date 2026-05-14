"use client";

import { TweetPost } from "@/app/(ui)/tweet/tweet-post";
import { HomeFeed } from "@/components/home/home-feed";


export default function Home() {

  return (

    <div className="flex flex-col h-full">

       <div className="text-red-500 text-6xl">
        TESTE123
      </div>


      <TweetPost />

      <HomeFeed />

  

    </div>

  );

}