/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useDislikeReplyMutation,
  useDeleteCommentMutation,
  useLikeReplyMutation,
} from "../../../redux/features/comment/commentApi";
import { toast } from "sonner";

interface ReplyProps {
  reply: any;
  user?: any;
  commentId: string;
}

const Reply = ({ reply, user, commentId }: ReplyProps) => {
  const [likeComment] = useLikeReplyMutation();
  const [dislikeComment] = useDislikeReplyMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (replyId: string) => {
    setActiveDropdown(activeDropdown === replyId ? null : replyId);
  };

  const handleLike = async () => {
    try {
      await likeComment({ commentId, replyId: reply._id });
    } catch (error) {
      toast.error("Failed to like the reply. Please try again.");
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeComment({ commentId, replyId: reply._id });
    } catch (error) {
      toast.error("Failed to dislike the reply. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment({ replyId: reply._id });
    } catch (error) {
      toast.error("Failed to delete the reply. Please try again.");
    }
  };

  return (
    <div className="pl-6 mt-4 border-l-2 border-gray-200 dark:border-gray-600">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            {reply.userId.username}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={reply.createdAt} title={reply.createdAt}>
              {new Date(reply.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </p>
        </div>

        {user && user._id === reply.userId._id && (
          <div className="relative">
            <button
              onClick={() => toggleDropdown(reply._id)}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <span className="sr-only">Reply settings</span>
            </button>
            <div
              className={`${
                activeDropdown === reply._id ? "block" : "hidden"
              } absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby={`dropdownReply${reply._id}Button`}
              >
                <li>
                  <button
                    type="button"
                    className="w-full block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </footer>

      <p className="text-gray-500 dark:text-gray-400">{reply.reply}</p>

      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm gap-1 text-gray-500 hover:underline dark:text-gray-400 font-medium"
          onClick={() => handleLike()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5l1 1m0 0l1-1m-1 1v14"
            />
          </svg>
          <span>{reply.likes.length}</span>
        </button>
        <button
          type="button"
          className="flex items-center text-sm gap-1 text-gray-500 hover:underline dark:text-gray-400 font-medium"
          onClick={() => handleDislike()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l-1-1m0 0l-1 1m1-1V5"
            />
          </svg>
          <span>{reply.dislikes.length}</span>
        </button>
      </div>
    </div>
  );
};

export default Reply;
