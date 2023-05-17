import './CreateNewComment.css';

const CreateNewComment = ({ addCommentToDB, movieID }) => {

    const handleSubmit = () => {
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        addCommentToDB(name, comment, movieID);
    }

    return (
        <div className="newCommentContainer">
            <form className="userCommentForm">
                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="comment">Comment</label>
                    <textarea rows="4" type="text" id="comment" required />
                </div>
                <div className="formGroup">
                    <input type="submit" value="Submit" onClick={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default CreateNewComment;
