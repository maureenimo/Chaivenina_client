import React, { useState, useEffect } from 'react';
import mpesaLogo from './images/mpesa-logo.png';
import cashLogo from './images/cash-logo.png';
import paypalLogo from './images/paypal-logo.png';
import binanceLogo from './images/binance-logo.png';
import visaLogo from './images/visa-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/locations')
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPayment === 'mpesa') {
      navigate('/mpesa_payment');
    } else if (selectedPayment === 'cash') {
      alert('Please make payment upon delivery.');
    } else if (selectedPayment === 'paypal') {
      window.location.href = 'https://www.paypal.com/signin';
    } else if (selectedPayment === 'binance') {
      window.location.href = 'https://accounts.binance.com/en/login?ref=804491327';
    } else if (selectedPayment === 'visa') {
      window.location.href = 'https://www.visaonline.com/login/';
    }
    console.log('Payment submitted');
    alert('Address submitted');

    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());
    const origin = [-1.3063965601181275, 36.85755932273569];
    const destination = locations.find((location) => location.id == parseInt(formObject.cityId));

    console.log(destination);
    const order = {
      deliveryAddress: {
        area: formObject.cityId,
        street: formObject.street,
        building: formObject.building,
        room: formObject.room,
        notes: formObject.notes,
      },
      paymentMethod: formObject.paymentMethod,
      destination: {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
      origin: {
        latitude: origin[0],
        longitude: origin[1],
      },
    };
    console.log(JSON.stringify(order));
    navigate('/mpesa_payment', { replace: false, state: order });
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="payment-container" style={{backgroundColor: "#ff9d5723"}}>
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="payment-container">
            <div className="card-payment1">
              <strong>Payment Options</strong>
              <br />
              <div className="payment-options">
                {['mpesa', 'cash', 'paypal', 'visa', 'binance'].map(
                  (paymentOption) => (
                    <div key={paymentOption} className="other-option">
                      <input
                        type="radio"
                        id={paymentOption}
                        name="paymentMethod"
                        value={paymentOption}
                        checked={selectedPayment === paymentOption}
                        onChange={handlePaymentChange}
                        required
                      />
                      <label htmlFor={paymentOption}>
                        <img
                          src={getImageSource(paymentOption)}
                          alt={paymentOption}
                        />
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="card-payment2">
              <strong>Delivery Address</strong>
              <div className="delivery-address-form">
                <label htmlFor="area" className="form-label">
                  Area:
                </label>
                <select id="fi-cityId" name="cityId" className="form-label">
                  <option value="" disabled="">
                    Please select
                  </option>
                  <option value="1027">* SELECT YOUR CITY / AREA BELOW *</option>

                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                <br />
                <label htmlFor="street" className="form-label">
                  Street:
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="form-input"
                  placeholder="Monrovia, UtaliiAve"
                  required
                />

                <label htmlFor="building" className="form-label">
                  Building:
                </label>
                <input
                  type="text"
                  id="building"
                  name="building"
                  className="form-input"
                  placeholder="GTC, Mirage, KICC, Chancery, UAP"
                  required
                />
                <label htmlFor="room" className="form-label">
                  Room:
                </label>
                <input
                  style={{fontFamily:'Times New Roman', fontSize:"13px"}}
                  type="text"
                  id="room"
                  name="room"
                  className="form-input"
                  placeholder="Room No. House No. Office Name"
                  required
                />

                <label htmlFor="notes" className="form-label">
                  Notes:
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className="form-input"
                  placeholder="Anything we should know before entering your property"
                />
              </div>
            </div>
            <div className="card-total">
              <strong>Order Summary</strong>
              <hr />
              <p>Item's total:</p>
              <p>Delivery fee:</p>
              <hr />
              <p>Total:</p>
              <hr />
              <div className="buttons-container">
                <button type="submit" className="continue-shopping">
                  Pay Now
                </button>
                <Link to={'/tracking'}>
                  <button className="continue-shopping">Pay on Delivery</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const getImageSource = (paymentOption) => {
  switch (paymentOption) {
    case 'mpesa':
      return mpesaLogo;
    case 'cash':
      return cashLogo;
    case 'paypal':
      return paypalLogo;
    case 'visa':
      return visaLogo;
    case 'binance':
      return binanceLogo;
    default:
      return '';
  }
};

export default PaymentPage;
