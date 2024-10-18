import React from "react";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AboutUs() {
  const teamMembers = [
    { name: "Amratanshu Mishra", role: "Lead Full Stack Developer" },
    { name: "Govind Kumar Kalvar", role: "Database & Deployment Overseer" },
    { name: "Bakhtyar Ansari", role: "UI/UX Designer & Frontend Developer" },
    { name: "Divyansh Pathak", role: "Technical Documentation Lead" },
    { name: "Gourav Kumar Panday", role: "Technical Documentation Lead" },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="about-us-container">
        <header className="about-us-header">
          <h1 className="about-us-title">About Our Gardeners' Forum</h1>
        </header>
        <main className="about-us-main">
          <section className="about-us-section">
            <h2 className="about-us-subtitle">Our Mission</h2>
            <p className="about-us-text">
              We aim to cultivate a thriving community where gardeners of all
              levels can share knowledge, exchange ideas, and grow together. Our
              forum is a nurturing space for green thumbs and plant enthusiasts
              to connect and flourish.
            </p>
          </section>
          <section className="about-us-section">
            <h2 className="about-us-subtitle">Who We Are</h2>
            <p className="about-us-text">
              Rooted in passion and planted in 2023, our gardeners' forum brings
              together diverse voices from backyard gardeners to horticultural
              experts. We're dedicated to fostering a sustainable, supportive
              network where every member can learn, teach, and grow.
            </p>
          </section>
          <section className="about-us-section">
            <h2 className="about-us-subtitle">Our Team</h2>
            <div className="team-members-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member-card">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="about-us-section">
            <h2 className="about-us-subtitle">Join Our Community</h2>
            <p className="about-us-text">
              Whether you're tending to your first seedling or managing a
              full-fledged garden, there's a place for you here. Share your
              experiences, seek advice, and be part of a supportive network of
              fellow gardening enthusiasts.
            </p>
            <button
              className="about-us-button"
              onClick={() => {
                navigate("/login");
                console.log("Button clicked!");
              }}
            >
              Start Growing With Us
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
