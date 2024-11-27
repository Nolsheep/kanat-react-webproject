import React, { useState } from "react";
import Comment from "./Comment";
import "../styles/Post.css";

function Post({ post, posts, setPosts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);

  const [isLiked, setIsLiked] = useState(false); // ตรวจสอบว่าไลก์แล้วหรือยัง

  // ฟังก์ชันแก้ไข
  const editPost = () => {
    const updatedPosts = posts.map((p) =>
      p.id === post.id ? { ...p, title: newTitle, content: newContent } : p
    );
    setPosts(updatedPosts);
    setIsEditing(false);
  };

  // ฟังก์ชันลบ
  const deletePost = () => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // ฟังก์ชันกดใจ
  const toggleLike = () => {
    if (!isLiked) {
      const updatedPosts = posts.map((p) =>
        p.id === post.id ? { ...p, likes: p.likes + 1 } : p
      );
      setPosts(updatedPosts);
      setIsLiked(true);
    }
  };

  return (
    <div className="post">
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          ></textarea>
          <button onClick={editPost}>Save</button>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      )}

      <div className="actions">
        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
        <button onClick={deletePost}>Delete</button>
        <button onClick={toggleLike} disabled={isLiked}>
          {isLiked ? "Liked" : "Like"}
        </button>
        {/* แสดงจำนวนไลก์ */}
        <span className="likes-count">❤️ {post.likes} Likes</span>
      </div>

      {/* คอมเมนต์ */}
      <Comment post={post} setPosts={setPosts} />
    </div>
  );
}

export default Post;
