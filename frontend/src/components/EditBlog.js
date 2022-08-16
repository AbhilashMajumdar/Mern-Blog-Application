import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {

  const history = useNavigate();

  const id = useParams().id;

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

  const cancel = () => {
    history('/myblogs');
  }

  const getRequest = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
    const data = await res.data;
    const {title, description, image} = data.blog;
    setBlogData({title, description, image});
  }

  useEffect(()=>{
    getRequest();
  }, [id]);

  const putRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/updateblog/${id}`, {
      title,
      description,
      image
    });
    const data = await res.data;
    return data;
  }

  const editData = (e) => {
    e.preventDefault();
    putRequest().then((data)=>window.alert(data.message)).then(()=>history('/myblogs'));
  }

  return (
    <>
      <div className="row justify-content-center mt-5 pt-5">
        <div className="col-md-3 mt-5">
          <div className="form-head text-center my-4">
            <h2>Edit Blogs</h2>
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
              <button className='btn btn-danger mx-3' onClick={cancel}>Cancel</button>
              <button type='submit' className='btn btn-primary' onClick={editData}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditBlog