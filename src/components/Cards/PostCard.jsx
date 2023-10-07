import React from "react";
import appwriteService from "../../../Appwrite/database";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImg }) => {
  // Check if featuredImg is valid before calling getFilePreview
  

  return (
    <Link to={`/post/${$id}`}>
      <div className="card w-96 bg-base-100 shadow-xl rounded-xl border">
        <figure>
          {/* Render the image only if filePreview is available */}
          <img src={appwriteService?.getFilePreview(featuredImg)} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
  
          <div className="card-actions justify-end">
            {/* <button className="btn btn-primary">Buy Now</button> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
