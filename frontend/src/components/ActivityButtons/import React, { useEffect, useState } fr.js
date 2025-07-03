import React, { useEffect, useState } from "react";

// Sample Users
const users = {
  "673f1361d8b40e1c40ec7c21": "Alice",
  "674705a6cce52dab882d2c77": "Bob",
  "6782b7cc048ecd587b2d2d1d": "Charlie",
};

// Sample Comment Data
const initialComments = [
  {
    _id: "1",
    comment: "Great post!",
    blogId: "678576edf2d4146953c63cc6",
    commmentedBy: "673f1361d8b40e1c40ec7c21",
    nextedComment: null,
  },
  {
    _id: "2",
    comment: "Very informative, thanks.",
    blogId: "678576edf2d4146953c63cc6",
    commmentedBy: "674705a6cce52dab882d2c77",
    nextedComment: null,
  },
  {
    _id: "3",
    comment: "I like the way you explained it.",
    blogId: "678576edf2d4146953c63cc6",
    commmentedBy: "6782b7cc048ecd587b2d2d1d",
    nextedComment: null,
  },
  {
    _id: "4",
    comment: "Can you elaborate more?",
    blogId: "678576edf2d4146953c63cc6",
    commmentedBy: "673f1361d8b40e1c40ec7c21",
    nextedComment: null,
  },
  {
    _id: "5",
    comment: "Nice article!",
    blogId: "678576edf2d4146953c63cc6",
    commmentedBy: "674705a6cce52dab882d2c77",
    nextedComment: null,
  },
  // Replies
  {
    _id: "6",
    comment: "Sure! I’ll update it soon.",
    blogId: "678576edf2d4146953c63cc6",
    commmentedBy: "6782b7cc048ecd587b2d2d1d",
    nextedComment: "4", // reply to comment 4
  },
  {
    _id: "7",
    comment: "Agree with you!",
    blogId: "678576edf2d4146953c63cc6",
    commmentedBy: "673f1361d8b40e1c40ec7c21",
    nextedComment: "2", // reply to comment 2
  },
];

const CommentButton = ({ blogId = "678576edf2d4146953c63cc6", userId = "673f1361d8b40e1c40ec7c21" }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [activeReplies, setActiveReplies] = useState({});

  useEffect(() => {
    // Simulate fetching from backend
    setComments(initialComments);
  }, []);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj = {
      _id: Date.now().toString(),
      comment: newComment,
      blogId,
      commmentedBy: userId,
      nextedComment: null,
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleReply = (commentId) => {
    if (!replyText[commentId]?.trim()) return;
    const replyObj = {
      _id: Date.now().toString(),
      comment: replyText[commentId],
      blogId,
      commmentedBy: userId,
      nextedComment: commentId,
    };
    setComments([replyObj, ...comments]);
    setReplyText((prev) => ({ ...prev, [commentId]: "" }));
  };

  const handleDelete = (id) => {
    // Delete comment and its replies
    setComments((prev) =>
      prev.filter(
        (comment) => comment._id !== id && comment.nextedComment !== id
      )
    );
  };

  const getMainComments = () =>
    comments.filter((c) => c.blogId === blogId && c.nextedComment === null);

  const getReplies = (parentId) =>
    comments.filter((c) => c.nextedComment === parentId);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => setShowCommentBox(!showCommentBox)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {showCommentBox ? "Cancel" : "Add Comment"}
      </button>

      {showCommentBox && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type a comment..."
            className="w-full p-2 border-2 border-gray-300 rounded resize-none focus:outline-none"
          />
          <div className="text-right mt-2">
            <button
              onClick={handlePostComment}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="mt-6 space-y-4">
        {getMainComments().map((comment) => (
          <div key={comment._id} className="bg-gray-100 p-4 rounded shadow">
            <div className="font-semibold text-sm text-gray-700">
              {users[comment.commmmentedBy] || "Anonymous"}
            </div>
            <div className="my-2 text-gray-800">{comment.comment}</div>

            <div className="flex items-center gap-4 text-sm text-blue-600">
              <button
                onClick={() => handleDelete(comment._id)}
                className="hover:underline text-red-600"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  setActiveReplies((prev) => ({
                    ...prev,
                    [comment._id]: !prev[comment._id],
                  }))
                }
                className="hover:underline"
              >
                {activeReplies[comment._id] ? "Hide Replies" : "Replies"}
              </button>
            </div>

            {/* Replies Section */}
            {activeReplies[comment._id] && (
              <div className="mt-4 ml-4 border-l pl-4 border-gray-300 space-y-2">
                {getReplies(comment._id).map((reply) => (
                  <div
                    key={reply._id}
                    className="bg-white border p-2 rounded text-sm"
                  >
                    <div className="text-gray-700 font-medium">
                      {users[reply.commmmentedBy] || "Anonymous"}
                    </div>
                    <div className="text-gray-800">{reply.comment}</div>
                  </div>
                ))}

                <textarea
                  rows={2}
                  value={replyText[comment._id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [comment._id]: e.target.value,
                    }))
                  }
                  placeholder="Write a reply..."
                  className="w-full p-2 border rounded focus:outline-none resize-none"
                />
                <div className="text-right">
                  <button
                    onClick={() => handleReply(comment._id)}
                    className="mt-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentButton;
