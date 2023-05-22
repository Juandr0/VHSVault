import { useState } from 'react';
import './CreateNewComment.css';

const CreateNewComment = ({ addCommentToDB, movieID }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        addCommentToDB(name, comment, movieID);
        setName('');
        setComment('');
    };

    return (
        <div className="newCommentContainer">
            <form className="userCommentForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="comment">Comment</label>
                    <textarea rows="4" type="text" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
                </div>
                <div className="formGroup">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default CreateNewComment;
