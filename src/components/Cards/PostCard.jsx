import React from "react";
import appwriteService from "../../../Appwrite/database";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostCard = ({ $id, title, featuredImg , author}) => {
  // Check if featuredImg is valid before calling getFilePreview

  const userData = useSelector(state => state.auth.userData);
  

  return (
    <Link to={`/post/${$id}`}>
      <div className="card w-auto h-auto bg-base-100 shadow-xl rounded-xl border  border-gray-400 capitalize text-center">
        <figure>
          {/* Render the image only if filePreview is available */}
          <img className="h-[240px] sm:h-[200px]" src={appwriteService?.getFilePreview(featuredImg)} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="text-lg font-bold"> Title: {title}</h2>
          <p className="text-base "> author : {author}</p>
  
          <div className=" justify-end animate-pulse">
            Read more
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
