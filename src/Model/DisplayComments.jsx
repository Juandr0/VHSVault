import React from "react";
import "./DisplayComments.css"

const DisplayComments = ({comment}) => {

   
    return (
        <div className="commentsContainer">
              <p>Name: {comment.name}</p>
              <p>Comment: {comment.comment}</p>
              <p>Upvotes: {comment.upvotes}</p>
        </div>
      );
}

export default DisplayComments;