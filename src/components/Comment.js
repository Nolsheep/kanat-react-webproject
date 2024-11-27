import React, { useState } from "react";
import "../styles/Comment.css";

function Comment({ post, setPosts }) {
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...post.comments, { id: Date.now(), text: newComment }];
      const updatedPost = { ...post, comments: updatedComments };
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
      );
      setNewComment("");
    }
  };

  const deleteComment = (commentId) => {
    const updatedComments = post.comments.filter((c) => c.id !== commentId);
    const updatedPost = { ...post, comments: updatedComments };
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === post.id ? updatedPost : p))
    );
  };

  return (
    <div className="comments">
      <h4>Comments</h4>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={addComment}>Add</button>
    </div>
  );
}

export default Comment;
