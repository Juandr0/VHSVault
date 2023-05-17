import React, { useState } from "react";
import "./DisplayComments.css"
import { doc, updateDoc } from "firebase/firestore";


const DisplayComments = ({ comment, movieID, db }) => {

    const [showComment, setShowComment] = useState(comment.upvotes >= 0);
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
                {
                    //Shows plus-sign or minus-sign depending on showComment state
                    showComment ? 
                    <i className={"fa fa-minus hideComment"} onClick={() => {setShowComment(!showComment)} } title={"Click to hide comment"}></i> : 
                    <i className={"fa fa-plus showComment"} onClick={() => {setShowComment(!showComment)}} title={"Click to show comment"}></i>
                }

            </div>



            {showComment ?
                <div className="commentComment">
                    <p>{comment.comment}</p>
                </div>
                :


                //Second ternary displays two different messages depending on if the 
                //user manually hides the comment or if the comment has too many downvotes.
                comment.upvotes < 0 ? 
                <div className="commentHiddenComment">
                    <p>This comment has received too many downvotes and has been hidden. To view the comment, click the "+" button.</p>
                </div> 
                :
                <div className="commentHiddenComment">
                    <p>Comment hidden.</p>
                </div> 
            }
        </div>
    );
}

export default DisplayComments;