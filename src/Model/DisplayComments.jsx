import React, { useState } from "react";
import "./DisplayComments.css"
import { doc, updateDoc } from "firebase/firestore";


const DisplayComments = ({ comment, movieID, db }) => {

    const [userVote, setUserVote] = useState("");
    const [thumbsUpColor, setThumbsUpColor] = useState('fa fa-thumbs-up commentThumbs');
    const [thumbsDownColor, setThumbsDownColor] = useState('fa fa-thumbs-down commentThumbs');

    const firebaseHandler = async (calcMethod) => {
        try {
            const commentsRef = doc(db, "movies", movieID, "comments", comment.ID);
            if (calcMethod === "+") {
                await updateDoc(commentsRef, {
                    upvotes: comment.upvotes + 1
                })
            } else if (calcMethod === "-") {
                await updateDoc(commentsRef, {
                    upvotes: comment.upvotes - 1
                })
            }

        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };


    const upVoteHandler = () => {
        if (userVote != '+') {
            firebaseHandler('+')
        }
        setUserVote('+')
        setThumbsUpColor('fa fa-thumbs-up commentThumbs voted')
        setThumbsDownColor('fa fa-thumbs-down commentThumbs')
    }

    const downVoteHandler = () => {
        if (userVote != '-') {
            firebaseHandler('-')
        }
        setUserVote('-')
        setThumbsDownColor('fa fa-thumbs-down commentThumbs voted')
        setThumbsUpColor('fa fa-thumbs-up commentThumbs')

    }


    return (
        <div className="commentsContainer">
            <div className="commentInfoContainer">
                <div className="commentName"><p>By: {comment.name}</p></div>
                <div className="commentUpvotesContainer">
                    <i className={thumbsDownColor} onClick={downVoteHandler}></i>
                    <p id="commentUpvotes">{comment.upvotes}</p>
                    <i className={thumbsUpColor} onClick={upVoteHandler}></i>

                </div>

            </div>
            <div className="commentComment"><p>{comment.comment}</p></div>
        </div>
    );
}

export default DisplayComments;