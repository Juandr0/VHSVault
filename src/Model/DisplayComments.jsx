import React from "react";
import "./DisplayComments.css"
import {doc, updateDoc} from "firebase/firestore";


const DisplayComments = ({ comment, movieID ,db }) => {

    const firebaseHandler = async (calcMethod) => {
        try {
            const commentsRef = doc(db, "movies", movieID, "comments", comment.ID);
            if (calcMethod === "+") {
                await updateDoc(commentsRef, {
                    upvotes : comment.upvotes + 1
                })
            } else if (calcMethod === "-") {
                await updateDoc(commentsRef, {
                    upvotes : comment.upvotes - 1
                })
            } 
            
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };
    

    const upVoteHandler = () => {
        firebaseHandler('+')
    }

    const downVoteHandler = () => {
        firebaseHandler('-')
    }


    return (
        <div className="commentsContainer">
            <div className="commentInfoContainer">
                <div className="commentName"><p>By: {comment.name}</p></div>
                <div className="commentUpvotesContainer">
                    <i className="fa fa-thumbs-down commentThumbs" onClick={downVoteHandler}></i>
                    <p id="commentUpvotes">{comment.upvotes}</p>
                    <i className="fa fa-thumbs-up commentThumbs" onClick={upVoteHandler}></i>
                </div>

            </div>
            <div className="commentComment"><p>{comment.comment}</p></div>
        </div>
    );
}

export default DisplayComments;