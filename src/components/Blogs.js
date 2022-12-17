import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import "../App.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5001/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div style={{ marginTop: "5%", marginBottom: "3%" }}>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog._id}
            title={blog.title}
            description={blog.description}
            negotiable={blog.negotiable}
            payment={blog.payment}
            requirements={blog.requirements}
            email={blog.user.email}
            userName={blog.user.name}
            deadline={blog.deadline}
            uploadTime={blog.uploadTime}
            contactno={blog.contactno}
          />
        ))}
    </div>
  );
};

export default Blogs;
