import React from 'react';
import {Link} from 'react-router-dom';

const Blog = ({title, description, image, userName, isUser, id}) => {
    
    return (
        <>
            <div className="card my-3 text-center" style={{"width": "38rem"}}>
                <img src={image} className="card-img-top" alt={title}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                    </div>
                    {
                        isUser &&
                        <div className='my-4 text-center'>
                            <Link to={`/editblog/${id}`}><button className='btn btn-primary mx-3'>Edit</button></Link>
                            <Link to={`/deleteblog/${id}`}><button className='btn btn-danger'>Delete</button></Link>
                        </div>
                    }
            </div>
        </>
    )
}

export default Blog