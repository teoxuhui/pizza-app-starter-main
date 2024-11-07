import './index.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { pizzaData } from './data'; // Your pizza data

function Header() {
  return <h1 style={{ color: "#ff5722", fontSize: "48px", textTransform: "uppercase" }}>XuHui's Pizza Co.</h1>;
}

function Pizza({ pizza, onToggleFavorite }) {
  const { name, ingredients, photoName, price, soldOut, isFavorite } = pizza;

  return (
    <div className={`pizza ${soldOut ? 'sold-out' : ''}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <p>{soldOut ? "Sold Out" : `$${price}`}</p>
        <button 
          className={`fav-btn ${isFavorite ? 'fav' : ''}`} 
          onClick={() => onToggleFavorite(name)}
        >
          {isFavorite ? '❤️ Added to Favourites' : 'Add to Favourites'}
        </button>
      </div>
    </div>
  );
}

function Menu({ pizzas, onToggleFavorite, searchQuery, onSearch }) {
  const filteredPizzas = pizzas.filter(pizza => 
    pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pizza.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search pizzas..." 
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>
      <div className="pizzas">
        {filteredPizzas.map((pizza, index) => (
          <Pizza 
            key={index} 
            pizza={pizza} 
            onToggleFavorite={onToggleFavorite} 
          />
        ))}
      </div>
    </div>
  );
}

function Footer({ isOpen }) {
  return (
    <footer>
      {isOpen ? (
        <>
          <h3>We're currently Open</h3>
          <button>Order</button>
        </>
      ) : (
        <p>Sorry, we're closed</p>
      )}
    </footer>
  );
}

function App() {
  const [pizzas, setPizzas] = useState(pizzaData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleFavorite = (pizzaName) => {
    const updatedPizzas = pizzas.map((pizza) =>
      pizza.name === pizzaName ? { ...pizza, isFavorite: !pizza.isFavorite } : pizza
    );
    setPizzas(updatedPizzas);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const date = new Date();
  const showTime = date.getHours();
  const isOpen = showTime >= 10 && showTime <= 22;

  return (
    <div className="container">
      <Header />
      <Menu 
        pizzas={pizzas} 
        onToggleFavorite={handleToggleFavorite} 
        searchQuery={searchQuery} 
        onSearch={handleSearch} 
      />
      <Footer isOpen={isOpen} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
