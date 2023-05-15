import React from "react";
import "./DisplayComments.css"

const DisplayComments = ({comment}) => {

   
    return (
        <div className="commentsContainer">
            <div className="commentName"><p>By: {comment.name}</p></div>
            <div className="commentComment"><p>{comment.comment}</p></div>
            <div className="commentUpvotes"><p>{comment.upvotes}</p></div>
        </div>
      );
}

export default DisplayComments;