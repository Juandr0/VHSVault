import './CreateNewComment.css';


const CreateNewComment = ({addCommentToDB, movieID} ) => {
    //write comment to db collumn movies/movieID/comments/


    const handleSubmit = () => {
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;
        addCommentToDB(name, comment, movieID);
    }
 

    return (
        <div className="newCommentContainer">
            <form className="userCommentForm">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required />
                <label htmlFor="comment">Comment</label>
                <textarea rows="4" type="text" id="comment" required />


                <input type="submit" value="Submit" onClick={handleSubmit}/>

                
            </form>

        </div>
    )
}

export default CreateNewComment;