import { json, useLocation } from 'react-router-dom';
import Movie from '../Model/Movie';
import './CSS/MovieInformationView.css';
import apiFetcher from '../Components/apiFetcher';
import { useEffect, useRef, useState } from 'react';
import Error404Message from '../Components/Error404Message';
import CreateNewComment from '../Model/CreateNewComment';
import DisplayComments from '../Model/DisplayComments';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, addDoc, getDocs} from "firebase/firestore";

const MovieInformationView = () => {
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState(location.pathname)
    const [comments, setComments] = useState([]);
    const [movie, setMovie] = useState(location.state?.movie);
    const providedMovieId = location.pathname.split('/')[2];

    const firebaseConfig = {
        apiKey: "AIzaSyAj9jcY-K4uZslJ1IMJYobgwWFRNYhEVTY",
        authDomain: "webbshop-d762c.firebaseapp.com",
        projectId: "webbshop-d762c",
        storageBucket: "webbshop-d762c.appspot.com",
        messagingSenderId: "701571660328",
        appId: "1:701571660328:web:0cf4bf9b02bd7265ccd31d"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



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
            const querySnapshot = await getDocs(collection(db, "movies", providedMovieId, "comments"));
            querySnapshot.forEach((doc) => {
                commentsList.push({ID: doc.id, ...doc.data()});
            });
            setComments(commentsList);
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
            <div>
                <div className='MovieInfoViewContainer'>
                    <Movie
                        props={movie}
                        withAddButton={true}
                        withDescription={true}
                        posterWidth={posterWidth}
                        runPriceAlgoritm={true}
                    />
                    <div className='readCommentsContainer'>
                          <h3>User comments</h3>
                            {comments.map((comment, index) => (
                                
                                <DisplayComments comment={comment} key={index} db={db} movieID={providedMovieId}/>
                            ))}
                    </div>
                </div>

                <div className='newCommentContainer'>
                    <h3>Add a new comment</h3>
                    <CreateNewComment addCommentToDB={addCommentToDB} movieID={providedMovieId} />
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
