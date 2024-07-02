import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Carousel1 from "../assets/dineinphoto.jpg";

const Register = () => {
  const [user, setUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phone: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();
  const image = [Carousel1];

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setUser({ ...user, [id]: value });
  };
