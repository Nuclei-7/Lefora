import React, { useEffect, useState } from "react";
import "./ThankYouPage.css"; // Importing CSS for styling

const ThankYouPage = () => {
  const [timer, setTimer] = useState(5); // Timer state initialized to 5 seconds

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000); // Decrease timer every second

    // Redirect to home page after 5 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    // Cleanup function
    return () => {
      clearInterval(countdown);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="thank-you-container">
      <h1 className="thank-you-title">THANK YOU!</h1>
      <p className="thank-you-message">
        Your order has been placed successfully.
      </p>
      <img
        src="https://www.pngitem.com/pimgs/m/219-2192179_transparent-thank-you-png-png-download.png" // You can use a different image if you prefer
        alt="Thank You"
        className="thank-you-image"
      />
      <p className="thank-you-note">We appreciate your business!</p>
      <p className="thank-you-timer">
        Redirecting to home in {timer} seconds...
      </p>
      <button
        onClick={() => (window.location.href = "/")} // Redirect to home on click
        className="thank-you-button"
      >
        Return to Home
      </button>
    </div>
  );
};

export default ThankYouPage;
