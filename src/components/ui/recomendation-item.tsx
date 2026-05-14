"use client";

import Link from "next/link";
import { Button } from "./button";
import { useState } from "react";

type Props = {
  user: {
    name: string;
    avatar: string;
    slug: string;
  };
};

export const RecommendationItem = ({ user }: Props) => {
  const [following, setFollowing] = useState(false);

  const handleFollowButton = () => {
    setFollowing(true);
  };

  return (
    <div className="flex items-center justify-between">
      
      
      <Link
        href={`/${user.slug}`}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-600 transition flex-1"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />

        <div className="overflow-hidden">
          <div className="text-white font-bold truncate">
            {user.name}
          </div>

          <div className="text-gray-400 text-sm truncate">
            @{user.slug}
          </div>
        </div>
      </Link>

  
      <div className="ml-2">
        {!following && (
          <Button
            label="Seguir"
            onClick={handleFollowButton}
            size={3}
          />
        )}
      </div>

    </div>
  );
};

export const RecommendationItemSkeleton = () => {
  return (
    <div className="animate-pulse flex items-center mb-4">
      
      
      <div className="w-10 h-10 mr-2 rounded-full bg-gray-600"></div>

     
      <div className="flex-1 flex flex-col gap-1">
        <div className="h-4 bg-gray-600 w-3/4"></div>
        <div className="h-4 bg-gray-600 w-1/4"></div>
      </div>

    </div>
  );
};