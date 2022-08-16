import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from './Blog';

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);

  const getRequest = async () => {
    const res = await axios.get('http://localhost:5000/api/blog');
    const data = res.data;
    return data;
  }

  useEffect(() => {
    getRequest().then((data) => setBlogs(data.blogs));
  }, []);

  // console.log(blogs);

  return (
    <>
      {
        blogs &&
        blogs.map((blog, i) => {
          return <div key={i} className="blog-des">
            <Blog title={blog.title}
              isUser={localStorage.getItem("userId")===blog.user._id}
              description={blog.description}
              image={blog.image}
              userName={blog.user.name}
              id={blog._id}
            />
          </div>
        })
      }
    </>
  )
}

export default Blogs