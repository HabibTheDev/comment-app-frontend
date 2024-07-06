/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  useDislikeReplyMutation,
  useDeleteReplyMutation,
  useEditReplyMutation,
  useLikeReplyMutation,
} from "../../../redux/features/comment/commentApi";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";

interface ReplyProps {
  reply: any;
  user?: any;
  commentId: string;
}

const Reply = ({ reply, user, commentId }: ReplyProps) => {
  const [likeComment] = useLikeReplyMutation();
  const [dislikeComment] = useDislikeReplyMutation();
  const [deleteReply] = useDeleteReplyMutation();
  const [editReply] = useEditReplyMutation();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.reply);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        await deleteReply({ replyId: reply._id });
        Swal.fire("Deleted!", "Your reply has been deleted.", "success");
      }
    } catch (error) {
      toast.error("Failed to delete the reply. Please try again.");
    }
  };

  const handleEdit = async (replyId: string) => {
    try {
      await editReply({ replyId, commentId, comment: editContent });
      setIsEditing(false);
      toast.success("Reply edited successfully.");
    } catch (error) {
      toast.error("Failed to edit the reply. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
              })}{" "}
              (
              {formatDistanceToNow(new Date(reply.createdAt), {
                addSuffix: true,
              })}
              )
            </time>
          </p>
        </div>

        {user && user._id === reply.userId._id && (
          <div className="relative" ref={dropdownRef}>
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
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </footer>

      {isEditing ? (
        <div>
          <textarea
            className="w-full p-2 border rounded"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="flex items-center mt-4 space-x-4">
            <button
              type="button"
              className="text-sm font-medium text-blue-500 hover:underline"
              onClick={() => handleEdit(reply._id)}
            >
              Save
            </button>
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:underline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">{reply.reply}</p>
      )}

      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm gap-1 text-gray-500 hover:underline dark:text-gray-400 font-medium"
          onClick={handleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={`w-5 h-5 ${
              reply.likes.includes(user?._id)
                ? "text-blue-500"
                : "text-gray-500"
            }`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>
          <span>{reply.likes.length}</span>
        </button>
        <button
          type="button"
          className="flex items-center text-sm gap-1 text-gray-500 hover:underline dark:text-gray-400 font-medium"
          onClick={handleDislike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={`w-5 h-5 ${
              reply.dislikes.includes(user?._id)
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
            />
          </svg>
          <span>{reply.dislikes.length}</span>
        </button>
      </div>
    </div>
  );
};

export default Reply;
