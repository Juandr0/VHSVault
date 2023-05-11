
const CalculateMoviePrice = (props) => {

    const moviePriceMakerAlgoritm = (props.vote_average * 7) + (props.popularity / 2);
    let finalPrice;


    switch (true) {
        //Low price
        case (moviePriceMakerAlgoritm <= 49): {
            finalPrice = 4.9;
            break;
        }

        //Low/medium price
        case (moviePriceMakerAlgoritm <= 79): {
            finalPrice = 7.9;
            break;
        }

        //medium price
        case (moviePriceMakerAlgoritm <= 99):
            finalPrice = 9.9;
            break;

        //medium/high price
        case (moviePriceMakerAlgoritm <= 129):
            finalPrice = 12.9;
            break;


        //high price
        case (moviePriceMakerAlgoritm <= 149):
            finalPrice = 14.9;
            break;

        //high/premium price
        case (moviePriceMakerAlgoritm <= 179):
            finalPrice = 17.9;
            break;

        //Premium price
        case (moviePriceMakerAlgoritm <= 199):
            finalPrice = 19.9;
            break;

        //Premium/platinum price
        case (moviePriceMakerAlgoritm <= 129):
            finalPrice = 12.9;
            break;

        //Platinum price
        default:
            finalPrice = 24.9;
            break;
    }

    return finalPrice

}


export default CalculateMoviePrice;