import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/Home.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      {/* Hero Section */}
       <section className="hero">
        <div className="hero-overlay">

  {/* NEW: stepped buttons with blurred background */}
        <div className="hero-actions">
  <Link to="/appointments" className="step step--gradient">
    <span className="step-icon">
      {/* calendar icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 2v3M17 2v3M3 9h18M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span className="step-label">Book Appointment</span>
  </Link>

  <Link to="/health-articles" className="step step--gradient">
    <span className="step-icon">
      {/* article/book icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 7h7M8 11h7M8 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </span>
    <span className="step-label">Health Articles</span>
  </Link>

  <Link to="/doctors" className="step step--gradient">
    <span className="step-icon">
      {/* doctor/profile icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span className="step-label">Doctor Profiles</span>
  </Link>
</div>
        </div>
      </section> 

      {/* About Section */}
      <section className="about">
        <div className="about-text">
          <h2>Welcome to Nawaloka Hospitals - Panadura</h2>
          <h3>"Immersed in Excellence"</h3>
          <p>
            Nawaloka Hospital Colombo - Where 400 beds and 600 medical consultants unite, 
            creating the epitome of premier healthcare in a single, extraordinary location
          </p>
        </div>
      </section>

<section className="about-split" id="about">
  {/* Left: full-height image */}
  <div className="about-media">
    <img src="src/assets/aboutus_img1.png" alt="Doctors with patient" />
  </div>

  {/* Right: logo + heading */}
  <div className="about-content">
    <img src="src/assets/onlylogo.png" alt="Nawaloka logo" className="about-logo" />
    <h1 className="about-title">
      Compassionate Care, Trusted Healing Your Wellbeing, Our Priority
    </h1>
    <p className="about-description">
      Nawaloka Hospital Panadura provides a wide range of medical, surgical, and diagnostic services to meet the diverse healthcare needs of the community. With modern facilities and advanced technology, the hospital is well-equipped to deliver accurate diagnoses and effective treatments across various specialties. From routine check-ups and laboratory investigations to advanced imaging and surgical care, patients have access to comprehensive healthcare under one roof.
    <br/>
    <br/>
Beyond medical expertise, the hospital focuses on offering personalized and compassionate care to every patient. Skilled healthcare professionals work closely with individuals to ensure treatment plans are tailored to their needs, while maintaining the highest standards of safety and quality. By combining technology, expertise, and a patient-centered approach, Nawaloka Hospital Panadura strives to create a supportive environment where healing and recovery are prioritized.
    </p>
  </div>
</section>

      {/* Info Section */}
      <section className="info">
        <div className="info-card">
          <span>📞 0115 577 111</span>
          <span>Call us on our 24/7 Hotline</span>
        </div>
        <div className="info-card">
          <h3>📍 Panadura, Sri Lanka</h3>
          <p>Visit our branch</p>
        </div>
        <div className="info-card">
          <h3>📧 nawaloka@slt.lk</h3>
          <p>Contact us through mail</p>
        </div>
      </section>

      {/* Logo Section */}
      <section className="logo-section">
        <img src="/assets/logo.png" alt="Nawaloka Logo" />
        <h2>Nawaloka Hospitals PLC</h2>
      </section>

      {/* Map Section */}
      <section className="map">
        <iframe
          title="Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!..."
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      {/* Buttons for Auth */}
      <section className="auth-links">
        {user ? (
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </div>
        )}
      </section>
    </div>
  );
}
