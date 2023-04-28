import { Link } from "react-router-dom";

const MovieCard = ({ title, price, image }) => {
  return (
    <div className="movie-card">
      <img src={image} alt={title} className="movie-cover" />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-price">${price}</p>
        <div className="trash-icon">🗑️</div>
      </div>
    </div>
  );
};

const ShoppingCartView = () => {
  // mockdata
  const movies = [
    {
      title: "Stepbrothers",
      price: 9.99,
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Get him to the greek",
      price: 14.99,
      image: "https://via.placeholder.com/150",
    },
    {
      title: "This is the end",
      price: 12.99,
      image: "https://via.placeholder.com/150",
    },
  ];

  const total = movies.reduce((acc, curr) => acc + curr.price, 0);
  const articleCount = movies.length;

  return (
    <div className="shopping-cart-view">
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            price={movie.price}
            image={movie.image}
          />
        ))}
      </div>
      <div className="summary">
        <h2>Summary</h2>
        <div className="total">
        <p>Articles: {articleCount}</p>
        <p>Shipping: Free</p>
          <p>Total: ${total.toFixed(2)}</p>
        </div>
        <div className="user-details">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Address" />
          <input type="email" placeholder="Email Address" />
        </div>
        <Link to="/confirmation">
          <button className="confirm-button">Place order</button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCartView;

