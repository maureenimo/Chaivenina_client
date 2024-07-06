import React, { useState, useEffect } from "react";
import "../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Carousel1 from "../assets/slide-image.jpg";

function Menu() {
  const savedCart = localStorage.getItem("cart");
  const image = [Carousel1];
  const [menuItems, setMenuItems] = useState([]);
  const [originalMenuItems, setOriginalMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState(savedCart ? JSON.parse(savedCart) : []);

  useEffect(() => {
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setMenuItems(originalMenuItems);
      return;
    }

    const filteredItems = originalMenuItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMenuItems(filteredItems);
  };

  return (
    <div>
      <Navbar />
      <section className="menu-image">
        <img src={image} alt="menu-image" />
        <h2 className="menu-title">Menu</h2>
      </section>
      <div className="home-container">
        <div className="container" style={{backgroundColor: "#ff9d5723"}}>
          <div className="cards-container" style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr"}}>
            {menuItems.map((item) => (
              <div key={item.id}>
                <img className="images" src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Kshs {item.price}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(item)}
                >
                  Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
