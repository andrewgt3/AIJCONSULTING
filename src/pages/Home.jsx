
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <h1>Bridging Industrial Expertise with Artificial Intelligence</h1>
          <p>AIJ Consulting combines decades of hands-on engineering experience with cutting-edge AI to solve your most complex manufacturing challenges.</p>
          <Link to="/services" className="btn btn-primary">Discover Our Services</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Why Partner with AIJ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                AIJ Engineering Consulting stands at the intersection of traditional industrial expertise and modern AI capabilities.
                We don't just advise; we implement practical, high-impact solutions tailored to your facility's unique needs.
              </p>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
                From optimizing intricate paint finishing lines to ensuring the reliability of your power infrastructure,
                our team brings decades of hands-on experience to every project.
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                height: '400px',
                background: 'url("/alex-jittu.jpg") center/cover no-repeat',
                borderRadius: '2px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                background: 'var(--color-primary)',
                padding: '1.5rem',
                border: '1px solid var(--color-secondary)',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <h4 style={{ margin: 0, color: 'var(--color-secondary)', fontSize: '1.2rem' }}>Alex Jittu</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Founder & Principal Consultant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(to right, #050f1e, #020c1b)' }}>
        <div className="container">
          <h2>Our Core Competencies</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Industrial AI Solutions</h3>
              <p>Custom AI integration for manufacturing processes, quality control, and predictive analysis to drive efficiency and reduce waste.</p>
            </div>
            <div className="service-card">
              <h3>Paint Finishing Systems</h3>
              <p>Specialized consulting for automotive and industrial paint lines, including sealer, LASD, and urethane application optimization.</p>
            </div>
            <div className="service-card">
              <h3>Power System Analysis</h3>
              <p>Expert arc flash analysis, power transformer consulting, and electrical infrastructure planning for maximum safety and reliability.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/services" className="btn btn-primary">View All Capabilities</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

