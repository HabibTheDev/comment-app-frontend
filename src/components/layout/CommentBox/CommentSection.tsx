/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useDeleteCommentMutation,
  useDisLikeCommentMutation,
  useGetAllCommentQuery,
  useLikeCommentMutation,
  useReplyCommentMutation,
  useUpdateCommentMutation,
} from "../../../redux/features/comment/commentApi";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";
import Reply from "../Reply/Reply";

const CommentSection = () => {
  const user = useAppSelector(selectCurrentUser);
  const socketRef = useRef<Socket | null>(null);

  const {
    data: commentsData,
    isLoading,
    isError,
    refetch: refetchComments,
  } = useGetAllCommentQuery(undefined);

  const [likeComment] = useLikeCommentMutation();
  const [dislikeComment] = useDisLikeCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [replyComment] = useReplyCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyInputFor, setShowReplyInputFor] = useState<string | null>(
    null
  );
  const [editText, setEditText] = useState("");
  const [isReplying, setIsReplying] = useState(false); // Track if user is replying
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      path: "/",
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to server");
    });

    socketRef.current.on("replyAdded", (data: any) => {
      console.log("Received reply:", data);
      toast.success(`New reply added: ${data.text}`);
      refetchComments();
    });

    socketRef.current.on("replyUpdated", (data: any) => {
      console.log("Reply updated:", data);
      toast.success(`Reply updated: ${data.text}`);
      refetchComments();
    });

    socketRef.current.on("replyDeleted", (data: any) => {
      console.log("Reply deleted:", data);
      toast.success(`Reply deleted`);
      refetchComments();
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [refetchComments]);

  const toggleDropdown = (commentId: string) => {
    setActiveDropdown(activeDropdown === commentId ? null : commentId);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (!(event.target as Element).closest(".relative")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLike = async (commentId: string) => {
    if (user) {
      try {
        await likeComment({ commentId });
      } catch (error) {
        toast.error("Failed to like the comment. Please try again.");
      }
    }
  };

  const handleDelete = async (commentId: string) => {
    if (user) {
      try {
        await deleteComment({ commentId });
      } catch (error) {
        toast.error("Failed to delete the comment. Please try again.");
      }
    }
  };

  const handleDislike = async (commentId: string) => {
    if (user) {
      try {
        await dislikeComment({ commentId });
      } catch (error) {
        toast.error("Failed to dislike the comment. Please try again.");
      }
    }
  };

  const handleReply = async (commentId: string) => {
    if (user && isReplying) {
      try {
        await replyComment({
          comment: replyText,
          commentId,
        });
        setReplyText("");
        setShowReplyInputFor(null);
        setIsReplying(false);
      } catch (error) {
        toast.error("Failed to reply to the comment. Please try again.");
      }
    }
  };

  const handleShowReplyInput = (commentId: string) => {
    setShowReplyInputFor(commentId);
    setIsReplying(true); // Mark user as replying
  };

  const handleCancelReply = () => {
    setShowReplyInputFor(null);
    setReplyText("");
    setIsReplying(false); // Reset replying state
  };

  const handleEdit = (commentId: string, currentComment: string) => {
    setEditingCommentId(commentId);
    setEditText(currentComment);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const handleUpdate = async (commentId: string) => {
    try {
      await updateComment({ commentId, comment: editText });
      toast.success("Comment updated successfully!");
      setEditingCommentId(null);
      setEditText("");
    } catch (error) {
      toast.error("Failed to update the comment. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (isError) {
    return <p>Error fetching comments.</p>;
  }

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto">
          {commentsData?.data.comments.map((comment: any) => (
            <article
              key={comment._id}
              className={`p-3 text-base bg-white rounded-lg dark:bg-gray-900 ${
                comment.replies.length > 0 ? "border border-blue-500" : ""
              }`}
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    {comment.userId.username}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      dateTime={comment.createdAt}
                      title={comment.createdAt}
                    >
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </p>
                </div>
                {user && user._id === comment.userId._id && (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(comment._id)}
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
                      <span className="sr-only">Comment settings</span>
                    </button>
                    <div
                      className={`${
                        activeDropdown === comment._id ? "block" : "hidden"
                      } absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby={`dropdownComment${comment._id}Button`}
                      >
                        <li>
                          <button
                            type="button"
                            className="w-full block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() =>
                              handleEdit(comment._id, comment.comment)
                            }
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="w-full block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => handleDelete(comment._id)}
                          >
                            Remove
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </footer>
              {editingCommentId === comment._id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleUpdate(comment._id)}
                      className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="inline-flex items-center py-2 px-4 ml-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.comment}
                </p>
              )}
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm gap-1 text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  onClick={() => handleLike(comment._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-5 h-5 ${
                      comment.likes.includes(user?._id)
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15s1-1 3-1 3 1 3 1M19 9s-1 1-3 1-3-1-3-1"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 23V12"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v.01"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v.01"
                    />
                  </svg>
                  {comment.likes.length}
                </button>
                <button
                  type="button"
                  className="flex items-center text-sm gap-1 text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  onClick={() => handleDislike(comment._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-5 h-5 ${
                      comment.dislikes.includes(user?._id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.7 14.7L12 17.4l-2.7-2.7a1 1 0 00-1.4 1.4L12 23.4l4.1-7.3a1 1 0 00-1.4-1.4z"
                    />
                  </svg>
                  {comment.dislikes.length}
                </button>
                <button
                  type="button"
                  className="flex items-center text-sm gap-1 text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  onClick={() => handleShowReplyInput(comment._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 9.4a8.4 8.4 0 11-2.1-4.4"
                    />
                  </svg>
                  {comment.replies.length}
                </button>
              </div>
              {showReplyInputFor === comment._id && (
                <div className="mt-4">
                  <textarea
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows={2}
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-700"
                      onClick={handleCancelReply}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                      onClick={() => handleReply(comment._id)}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}

              {comment.replies.map((reply: any) => (
                <Reply
                  key={reply._id}
                  reply={reply}
                  user={user}
                  commentId={comment._id}
                />
              ))}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommentSection;
