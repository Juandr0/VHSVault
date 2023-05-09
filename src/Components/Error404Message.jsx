import sadImage from "../assets/images/sad.png";
import "./Error404Message.css";


const Error404Message = ({movieId}) => {

    return (
    <div className="Error404Message">
        <img src={sadImage} alt="Error 404 - Not Found" />
        <div>Oops, something went wrong!</div>
        <div>We couldn't find the movie with ID {movieId}. Errorcode: 404</div>
    </div>
    )


}

export default Error404Message;