import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "react-feather";
import logo from "../assets/chai-vevinah-logo-grey.png";
import { useEffect, useState } from "react";

function Navbar() {
  const savedCart = localStorage.getItem("cart");
  const [cartItems, setCartItems] = useState(
    savedCart ? JSON.parse(savedCart) : []
  );

  useEffect(() => {
    console.log(savedCart);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
      // console.log(cart);
    }
  }, [savedCart]);

  const [cartLength, updateCartLength] = useState(
    cartItems ? cartItems.length : 0
  );

 

  return (
    <div className="navbar">
      <a href="/" className="navbar-brand">
        <img src={logo} alt="Vevinah Brand" />
      </a>
      
    </div>
  );
}

export default Navbar;