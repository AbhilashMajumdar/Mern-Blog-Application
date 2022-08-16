import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from './Blog';

const UserBlog = () => {

  const [user, setUser] = useState();

  const id = localStorage.getItem("userId");
  // console.log(id);

  const getRequest = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`);
    const data = await res.data;
    // console.log(data);
    return data;
  }

  useEffect(()=>{
    getRequest().then((data)=>setUser(data.user));
  }, [id]);

  // console.log(user);

  return (
    <>
      {
        user && user.blogs &&
        user.blogs.map((blog, i) => {
          return <div key={i} className="blog-des">
            <Blog title={blog.title}
              isUser={true}
              description={blog.description}
              image={blog.image}
              userName={user.name}
              id={blog._id}
            />
          </div>
        })
      }
    </>
  )
}

export default UserBlog