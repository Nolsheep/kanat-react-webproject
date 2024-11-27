import React, { useState } from "react";
import Post from "../components/Post";
import "../styles/App.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // สถานะสำหรับจัดการข้อความใหม่
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // เพิ่มโพสต์ใหม่
  const addPost = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newPost = { 
        id: Date.now(), 
        title: newTitle, 
        content: newContent, 
        likes: 0, 
        comments: [] 
      };
      setPosts([...posts, newPost]);
      setNewTitle("");
      setNewContent("");
    }
  };

  // ค้นหาโพสต์
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <h1>Message Manager</h1>

      {/* ฟิลด์ค้นหา */}
      <div>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ฟอร์มเพิ่มข้อความใหม่ */}
      <div className="new-post-form">
        <h2>Add New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>
        <button onClick={addPost}>Add Post</button>
      </div>

      {/* แสดงโพสต์ */}
      <div className="post-list">
        {filteredPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            setPosts={setPosts}
            posts={posts}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
