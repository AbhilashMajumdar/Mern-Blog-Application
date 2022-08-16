import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBlog = () => {

    const history = useNavigate();

    const id = useParams().id;

    const deleteRequest = async () => {
        const res = await axios.delete(`http://localhost:5000/api/blog/deleteblog/${id}`);
        const data = await res.data;
        return data;
    }

    useEffect(()=>{
        deleteRequest().then(()=>history('/myblogs'));
    }, [id]);

  return (
    <>
    
    </>
  )
}

export default DeleteBlog