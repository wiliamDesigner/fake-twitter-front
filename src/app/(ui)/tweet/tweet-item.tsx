"use client";

import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";

import { faRetweet } from "@fortawesome/free-solid-svg-icons/faRetweet";

import { useState, useEffect } from "react";

export const TweetItem = ({ tweet }: any) => {

  console.log("TWEET ITEM REAL");

  const [liked, setLiked] = useState(false);

  const [likesCount, setLikesCount] = useState(
    tweet.likes || 0
  );

  const [showCommentBox, setShowCommentBox] = useState(false);

  const [commentText, setCommentText] = useState("");

  const [comments, setComments] = useState<any[]>([]);

  // CARREGA COMENTÁRIOS
  useEffect(() => {

    loadComments();

  }, []);

  const loadComments = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/api/tweets/${tweet.id}/comments/`
      );

      const data = await response.json();

      setComments(data);

    } catch (err) {

      console.log(err);

    }

  };

  // LIKE
  const handleLikedButton = async () => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user_data") || "{}"
      );

      const response = await fetch(
        `http://127.0.0.1:8000/api/tweets/${tweet.id}/like/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            user_id: currentUser.id
          })
        }
      );

      const data = await response.json();

      setLiked(data.liked);

      setLikesCount(data.likes);

    } catch (err) {

      console.log(err);

    }

  };

  // COMENTAR
  const handleAddComment = async () => {

    if (!commentText.trim()) return;

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user_data") || "{}"
      );

      const response = await fetch(
        `http://127.0.0.1:8000/api/tweets/${tweet.id}/comments/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            user_id: currentUser.id,
            content: commentText
          })
        }
      );

      const data = await response.json();

      setComments([
        data,
        ...comments
      ]);

      setCommentText("");

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="flex gap-3 px-6 py-4 border-b border-gray-800">

      {/* Avatar */}
      <div>

        <img
          src={tweet.user?.avatar || "/emo.jpg"}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />

      </div>

      <div className="flex-1">

        {/* Nome */}
        <div className="flex items-center gap-2 flex-wrap">

          <div className="font-bold text-white">
            {tweet.user?.username}
          </div>

          <div className="text-gray-500 text-sm">
            @{tweet.user?.username} · {tweet.created_at}
          </div>

        </div>

        {/* Conteúdo */}
        <div className="py-2 text-white text-base">
          {tweet.content}
        </div>

        {/* IMAGEM */}
        {tweet.image && (

          <div className="mt-3 overflow-hidden rounded-2xl border border-gray-800 bg-black">

            <img
              src={`http://127.0.0.1:8000${tweet.image}`}
              alt=""
              className="
                w-full
                h-auto
                max-h-[500px]
                object-contain
              "
            />

          </div>

        )}

        {/* AÇÕES */}
        <div className="flex mt-4 text-gray-500">

          {/* COMENTÁRIO */}
          <div className="flex-1">

            <button
              onClick={() => {

                setShowCommentBox(!showCommentBox);

              }}
            >

              <FontAwesomeIcon
                icon={faComment}
                className="
                  w-5
                  h-5
                  cursor-pointer
                  hover:text-blue-500
                  transition
                "
              />

            </button>

          </div>

          {/* RETWEET */}
          <div className="flex-1">

            <FontAwesomeIcon
              icon={faRetweet}
              className="w-5 h-5 cursor-pointer"
            />

          </div>

          {/* LIKE */}
          <div className="flex-1">

            <div
              onClick={handleLikedButton}
              className={`
                inline-flex
                items-center
                gap-2
                cursor-pointer
                ${liked ? "text-red-500" : ""}
              `}
            >

              <FontAwesomeIcon
                icon={liked ? faHeartFilled : faHeart}
                className="w-5 h-5"
              />

              <div>
                {likesCount}
              </div>

            </div>

          </div>

        </div>

        {/* CAIXA COMENTÁRIO */}
        {showCommentBox && (

          <div className="mt-4">

            <textarea
              value={commentText}
              onChange={(e) =>
                setCommentText(e.target.value)
              }
              placeholder="Poste sua resposta"
              className="
                w-full
                bg-black
                border
                border-gray-700
                rounded-2xl
                p-3
                text-white
                outline-none
                resize-none
                h-24
              "
            />

            <div className="flex justify-end mt-3">

              <button
                onClick={handleAddComment}
                className="
                  bg-white
                  text-black
                  px-5
                  py-2
                  rounded-full
                  font-bold
                  hover:opacity-80
                "
              >
                Responder
              </button>

            </div>

          </div>

        )}

        {/* LISTA COMENTÁRIOS */}
        {comments.length > 0 && (

          <div className="mt-4">

            {comments.map((comment) => (

              <div
                key={comment.id}
                className="
                  border-t
                  border-gray-800
                  py-4
                "
              >

                <div className="font-bold text-white">
                  @{comment.user?.username}
                </div>

                <div className="text-gray-400 text-sm mb-2">
                  {comment.created_at}
                </div>

                <div className="text-white">
                  {comment.content}
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};