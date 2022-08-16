import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {

  const history = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: ""
  });

  const { title, description, image } = blogData;

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setBlogData({ ...blogData, [name]: value });
  }

  const resetData = () => {
    setBlogData({
      title: "",
      description: "",
      image: ""
    });
  }

  const postRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/blog/addblog', {
        title,
        description,
        image,
        user : localStorage.getItem("userId")
      }
    ).catch((err)=>console.log(err));
    
    const data = await res.data;
    return data;
  }

  const submitData = (e) => {
    e.preventDefault();
    postRequest().then(()=>history('/myblogs'));
  }

  return (
    <>
      <div className="row justify-content-center mt-5 pt-5">
        <div className="col-md-3 mt-5">
          <div className="form-head text-center my-4">
            <h2>Add Blogs</h2>
          </div>
          <form action="">
            <div className="mb-3">
              <input type="text"
                className='form-control'
                placeholder='Enter Blog Title'
                name='title'
                value={title}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <input type="text"
                className='form-control'
                placeholder='Enter Blog Description'
                name='description'
                value={description}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <input type="text"
                placeholder='Enter Image Url'
                className='form-control'
                name='image'
                value={image}
                onChange={handleInput}
              />
            </div>
            <div className="mt-4 text-center">
              <button className='btn btn-danger mx-3' onClick={resetData}>Reset</button>
              <button type='submit' className='btn btn-primary' onClick={submitData}>Add</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddBlog