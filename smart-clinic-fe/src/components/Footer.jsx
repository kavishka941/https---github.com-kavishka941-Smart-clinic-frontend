import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top info bar (matches screenshot icons/blocks) */}
      <div className="footer-info">
        <div className="info-card">
          <div className="info-emoji">📞</div>
          <div>
            <div className="info-title">0115 577 111</div>
            <div className="info-sub">Call us on our 24/7 Hotline</div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-emoji">📍</div>
          <div>
            <div className="info-title">Panadura, Sri Lanka</div>
            <div className="info-sub">Visit our branch</div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-emoji">📧</div>
          <div>
            <div className="info-title">nawaloka@slt.lk</div>
            <div className="info-sub">Contact us through mail</div>
          </div>
        </div>
      </div>

      {/* Middle brand row */}
      <div className="footer-brand">
        <img src="/assets/logo.png" alt="Nawaloka Hospitals" />
        <h3>Nawaloka Hospitals PLC</h3>
      </div>

      {/* Bottom legal */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Nawaloka Hospitals Panadura — All rights reserved.</p>
      </div>
    </footer>
  );
}
