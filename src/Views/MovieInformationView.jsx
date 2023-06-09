import { json, useLocation, useNavigate } from 'react-router-dom';
import Movie from '../Model/Movie';
import './CSS/MovieInformationView.css';
import apiFetcher from '../Components/apiFetcher';
import { useEffect, useRef, useState } from 'react';
import Error404Message from '../Components/Error404Message';
import CreateNewComment from '../Model/CreateNewComment';
import DisplayComments from '../Model/DisplayComments';
import FirebaseConfig from '../Components/FireBaseConfig';

import { collection, onSnapshot, addDoc } from "firebase/firestore";

const MovieInformationView = () => {
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState(location.pathname)
    const [comments, setComments] = useState([]);
    const [movie, setMovie] = useState(location.state?.movie);
    const providedMovieId = location.pathname.split('/')[2];

    const db = FirebaseConfig.getFirestoreInstance();
    const navigate = useNavigate();


    const addCommentToDB = async (inputName, inputComment, providedMovieId) => {
        try {
            const newComment = {
                name: inputName,
                comment: inputComment,
                upvotes: 0
            };
            const commentsRef = collection(db, "movies", providedMovieId, "comments");
            const docRef = await addDoc(commentsRef, newComment);
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const fetchCommentsFromDB = async () => {
        let commentsList = [];
        try {
            //Listener for DB-changes
            const unsubscribe = onSnapshot(collection(db, "movies", providedMovieId, "comments"), (querySnapshot) => {

                // Reset the comments list
                commentsList = [];

                // Fetches new data
                querySnapshot.forEach((doc) => {
                    commentsList.push({ ID: doc.id, ...doc.data() });
                });
                // Sort commentsList array based on upvotes value
                commentsList.sort((a, b) => b.upvotes - a.upvotes);

                setComments(commentsList);
            });
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };


    useEffect(() => {
        fetchCommentsFromDB();
    }, [])

    useEffect(() => {
        setMovie(undefined);
    }, [location.pathname]);

    useEffect(() => {
        if (!movie) {
            const fetchMovieData = async () => {
                const movieData = await apiFetcher(null, null, providedMovieId);
                setMovie(movieData);
            }
            fetchMovieData();
        }
    }, [location.pathname, movie]);


    const posterWidth = 500;
    if (movie?.title) {
        return (
            <div className='MovieInfoPage'>
                <i className="fa fa-arrow-circle-left backButton" onClick={() => {navigate(-1)}}></i>
                <div className='MovieInfoViewContainer'>

                    <Movie
                        props={movie}
                        withAddButton={true}
                        withDescription={true}
                        posterWidth={posterWidth}
                        runPriceAlgoritm={true}
                    />

                </div>
                <hr />
                <div className='movieCommentsContainer'>

                    <h3>User comments</h3>
                    <div className='readCommentsContainer'>
                        {comments.map((comment, index) => (

                            <DisplayComments comment={comment} key={index} db={db} movieID={providedMovieId} />
                        ))}
                    </div>

                    <div className='newCommentContainer'>
                        <h3>Add a new comment</h3>
                        <CreateNewComment addCommentToDB={addCommentToDB} movieID={providedMovieId} />
                    </div>
                </div>
            </div>

        )
    } else if (movie === 404) {
        return (
            <Error404Message movieId={providedMovieId} />
        )
    } else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }


}

export default MovieInformationView;
