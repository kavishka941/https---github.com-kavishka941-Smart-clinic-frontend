import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import "./Dashboard.css";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await api.get("/me")).data,
  });

  if (isLoading) return "Loading...";

  const userName = data?.name || data?.email || "Patient";

  return (
    <div className="pp-shell">
      {/* Sidebar */}
      <aside className="pp-sidebar">
        <div className="pp-brand">
          <img src="src/assets/onlylogo.png" alt="Hospital Logo" />
          <h2>Nawaloka Hospitals</h2>
          <p>PLC</p>
        </div>

        <nav className="pp-nav">
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#book">Book Appointment</a>
          <a href="#my-appointments">My Appointments</a>
          <a href="#feedback">Feedback</a>
        </nav>

        <div className="pp-notes">
          <h4>Notifications • <span>3</span></h4>
          <div className="pp-note">
            <strong>Appointment Reminder</strong>
            <p>Dr. Smith – Tomorrow 2:00 PM</p>
          </div>
          <div className="pp-note">
            <strong>New Message</strong>
            <p>Prescription ready for pickup</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="pp-main">
        {/* Top header */}
        <header className="pp-topbar">
          <div className="pp-user">
            <img className="pp-avatar" src="/user-avatar.png" alt={userName} />
            <div>
              <p className="pp-greet">Welcome back, {userName}!</p>
              <p className="pp-subgreet">Here’s your health overview • Role: {data?.role ?? "patient"}</p>
            </div>
          </div>
          <div className="pp-actions">
            <button aria-label="notifications" className="pp-icon">🔔</button>
            <button aria-label="refresh" className="pp-icon" onClick={() => window.location.reload()}>↻</button>
          </div>
        </header>

        {/* Portal heading */}
        <section className="pp-hero">
          <h2>Patient Portal</h2>
          <p>Welcome to the HealthCare Management System</p>
        </section>

        {/* Summary cards */}
        <section className="pp-cards">
          <article className="pp-card">
            <h3>Next Appointment</h3>
            <ul className="pp-kv">
              <li>Dr. Sarah Smith</li>
              <li>Tomorrow, 2:00 PM</li>
              <li>Room 205, Main Building</li>
            </ul>
            <div className="pp-chiprow">
              <span className="pp-chip pp-chip--ok">SMS Reminder Sent</span>
              <span className="pp-chip pp-chip--info">Email Confirmed</span>
            </div>
            <button className="pp-btn pp-btn--ghost">View Details</button>
          </article>

          <article className="pp-card">
            <h3>Digital Prescriptions</h3>
            <ul className="pp-list">
              <li>Blood Pressure Medication <em className="ok">Active</em></li>
              <li>Vitamin D Supplements <em className="done">Completed</em></li>
              <li>Pain Relieving Gel <em className="warn">Ready for pickup</em></li>
            </ul>
            <button className="pp-btn pp-btn--ghost">View Details</button>
          </article>

          <article className="pp-card">
            <h3>Health Metrics</h3>
            <ul className="pp-kv">
              <li>Blood Pressure <strong>120/80</strong></li>
              <li>Heart Rate <strong>72 bpm</strong></li>
              <li>Last Checkup <strong>Jan 15, 2024</strong></li>
            </ul>
          </article>
        </section>

        
      </main>
    </div>
  );
}
