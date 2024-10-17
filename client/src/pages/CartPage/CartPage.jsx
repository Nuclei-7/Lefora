import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import "./CartPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../services/CartContext"; // Assuming CartContext holds your cart state

const CartPage = ({ currentPage, handleNavClick }) => {
  const navigate = useNavigate();

  // Access cartItems from CartContext
  const { cartItems, setCartItems } = useContext(CartContext);

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    address: "",
  });

  const [slider, setSlider] = useState(false);
  const [errors, setErrors] = useState({});

  // Update totals when cartItems change
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Function to validate input fields before order confirmation
  const validateInputs = () => {
    let validationErrors = {};

    if (!deliveryInfo.name) validationErrors.name = "Name is required";
    if (!deliveryInfo.mobile)
      validationErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(deliveryInfo.mobile))
      validationErrors.mobile = "Invalid mobile number";

    if (!deliveryInfo.email) validationErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(deliveryInfo.email))
      validationErrors.email = "Invalid email address";

    if (!deliveryInfo.city) validationErrors.city = "City is required";
    if (!deliveryInfo.state) validationErrors.state = "State is required";
    if (!deliveryInfo.zip) validationErrors.zip = "ZIP code is required";
    else if (!/^[0-9]{5,6}$/.test(deliveryInfo.zip))
      validationErrors.zip = "Invalid ZIP code";

    if (!deliveryInfo.address) validationErrors.address = "Address is required";

    return validationErrors;
  };

  // Function to handle input changes for delivery information
  const handleInputChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  // Function to confirm order and save it to the database
  const handleConfirmOrder = async () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/orders/create",
          {
            cartItems,
            deliveryInfo,
            totalPrice,
          }
        );

        if (response.data.message === "Order saved successfully!") {
          console.log("Order confirmed and saved to the database!");
          setErrors({});
          // Navigate to the Thank You page after successful order confirmation
          navigate("/thankYou"); // Adjust this to your routing setup
        }
      } catch (err) {
        console.error("Error saving order:", err);
        // Optional: Set error state to inform the user about the failure
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // Function to increment the quantity of an item in the cart
  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };
  // Function to decrement the quantity of an item in the cart
  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handleSliderChange = () => {
    setSlider(!slider);
  };

  return (
    <>
      <Navbar currentPage={currentPage} handleNavClick={handleNavClick} />
      <div className="cart-page">
        <div className="left-section">
          <div>
            <h2>Delivery Information</h2>
            <div className="delivery-info">
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={deliveryInfo.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="phone"
                      name="mobile"
                      placeholder="Enter Your Number"
                      value={deliveryInfo.mobile}
                      onChange={handleInputChange}
                    />
                    {errors.mobile && <p className="error">{errors.mobile}</p>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={deliveryInfo.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter Your City"
                      value={deliveryInfo.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter Your State"
                      value={deliveryInfo.state}
                      onChange={handleInputChange}
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                  </div>
                  <div className="form-group">
                    <label>ZIP</label>
                    <input
                      type="number"
                      name="zip"
                      placeholder="Enter Your Zip/Postal Code"
                      value={deliveryInfo.zip}
                      onChange={handleInputChange}
                    />
                    {errors.zip && <p className="error">{errors.zip}</p>}
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Your Address"
                    value={deliveryInfo.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <p className="error">{errors.address}</p>}
                </div>
              </form>
            </div>
          </div>

          <div className="schedule-container">
            <div className="toggle">
              <h2>Schedule Delivery</h2>
              <label className="switch">
                <input type="checkbox" />
                <span
                  onClick={() => handleSliderChange()}
                  className="slider round"
                ></span>
              </label>
            </div>
            {!slider && (
              <div className="confidential-wrapper">
                <img
                  className="confidential"
                  src="https://static.vecteezy.com/system/resources/previews/021/433/001/original/confidential-rubber-stamp-free-png.png"
                  alt="Confidential"
                />
              </div>
            )}
            <div className="schedule-delivery">
              <div className="form-group full-width">
                <label>Dates</label>
                <input type="date" placeholder="Select delivery date" />
              </div>
              <div className="form-group full-width">
                <label>Note</label>
                <textarea placeholder="Type your note"></textarea>
              </div>
            </div>
          </div>

          <div>
            <h2>Payment Method</h2>
            <div className="payment-method">
              <div className="payment-options">
                <label>
                  <input type="radio" name="payment" value="online" />
                  Online Payment
                </label>
                <label>
                  <input type="radio" name="payment" value="cod" />
                  Cash on Delivery
                </label>
                <label>
                  <input type="radio" name="payment" value="pos" />
                  POS on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="right-section">
          <h2>Order Summary</h2>
          <div className="order-summary">
            <div className="cart-products">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="product-image"
                    />
                    <div className="item-details">
                      <p>{item.name}</p>
                      <p>Rs {item.price.toFixed(2)}</p>
                    </div>
                    <div className="item-quantity">
                      <button onClick={() => handleDecrement(item.id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cart-billing">
              <div className="summary-totals">
                <div className="subtotal">
                  <p style={{ color: "gray" }}>Subtotal: </p>
                  <p>Rs {totalPrice.toFixed(2)}</p>
                </div>
                <div className="shipping">
                  <p style={{ color: "gray" }}>Shipping: </p>
                  <p>Free</p>
                </div>
                <div className="total">
                  <h3>Total: </h3>
                  <h3>Rs {totalPrice.toFixed(2)}</h3>
                </div>
              </div>
              <button className="checkout-btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
