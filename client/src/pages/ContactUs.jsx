import React, { useState } from "react";
import { MdSend } from "react-icons/md"; // Import the send icon from react-icons
import { ImSpinner9 } from "react-icons/im"; // Import the spinner icon from react-icons
import emailjs from "@emailjs/browser"; // Import EmailJS
import "./ContactUs.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send email using EmailJS
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target, // Use the form element directly
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message. Please try again.");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="contact-us-container">
        <header className="contact-us-header">
          <h1 className="contact-us-title">Contact Us</h1>
          <p className="contact-us-subtitle">
            Get in touch with our green-thumbed team
          </p>
        </header>
        <main className="contact-us-main">
          <div className="contact-info">
            <h2 className="info-title">Reach Out</h2>
            <p className="info-text">
              Have a question about gardening or our forum? We're here to help!
            </p>
            <div className="info-item">
              <strong>Email:</strong> info@gardenersforum.com
            </div>
            <div className="info-item">
              <strong>Phone:</strong> (555) 123-4567
            </div>
            <div className="info-item">
              <strong>Address:</strong> 123 Green Street, Plant City, Earth
              98765
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="form-input"
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="form-input"
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="form-input"
                placeholder="What's this about?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="form-input"
                rows={5}
                placeholder="Tell us more..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ImSpinner9 className="animate-spin mr-2" size={18} />
                  Sending...
                </>
              ) : (
                <>
                  <MdSend size={18} className="mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </main>
      </div>
      <ContactUs />
      <Footer />
    </>
  );
}
