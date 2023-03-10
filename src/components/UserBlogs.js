import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5001/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, );
  // console.log(user);

  return(
     <div  style={{marginTop: '5%',  marginBottom: "3%"}}>
  {" "}
  {user && 
    user.blogs && 
    user.blogs.map((blog, index) =>
    (
    <Blog
    id={blog._id}
    key={index}
    isUser={true}
    title={blog.title}
    description={blog.description}
    negotiable={blog.negotiable}
    payment={blog.payment}
    requirements={blog.requirements}
    email={user.email}
    userName={user.name}
    deadline={blog.deadline}
    uploadTime={blog.uploadTime}
    contactno={blog.contactno}
    />
    ))}
   
    </div>
  );
};

export default UserBlogs;
