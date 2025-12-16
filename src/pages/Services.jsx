import { Link } from 'react-router-dom';

const servicesList = [
    {
        title: "AI-Based Projects",
        description: "Leverage the power of artificial intelligence to optimize your manufacturing processes.",
        longDescription: "We design and implement custom AI solutions tailored to the unique demands of the manufacturing sector. From computer vision systems for quality control to machine learning models for process optimization, our AI strategies are built to deliver measurable ROI.",
        features: ["Automated Quality Inspection", "Process Optimization Algorithms", "Data-Driven Decision Making", "Custom AI Model Training"]
    },
    {
        title: "Predictive Maintenance",
        description: "Stop reacting to failures and start preventing them with data-driven insights.",
        longDescription: "Our predictive maintenance solutions utilize advanced analytics and IoT sensors to monitor equipment health in real-time. By predicting failures before they occur, we help you reduce downtime, extend asset life, and lower maintenance costs.",
        features: ["Real-Time Asset Monitoring", "Failure Prediction Models", "Maintenance Scheduling Optimization", "IoT Sensor Integration"]
    },
    {
        title: "Paint Finishing & Applications",
        description: "Achieve flawless finishes with expert consulting for your paint lines.",
        longDescription: "With deep expertise in automotive and industrial paint systems, we optimize every stage of the application process. Whether it's sealer, LASD, or urethane, we ensure your system operates at peak efficiency with minimal waste and maximum quality.",
        features: ["Sealer & LASD Optimization", "Urethane Application Tuning", "Defect Reduction Strategies", "Cycle Time Improvement"]
    },
    {
        title: "Arc Flash Analysis",
        description: "Ensure the safety of your facility and compliance with electrical standards.",
        longDescription: "Safety is paramount. Our comprehensive arc flash analysis identifies potential hazards in your electrical system. We provide detailed reports, labeling, and mitigation strategies to keep your personnel safe and your facility compliant with NFPA 70E.",
        features: ["Comprehensive Hazard Analysis", "NFPA 70E Compliance", "Safety Labeling & Reporting", "Risk Mitigation Strategies"]
    },
    {
        title: "Power Transformers & Stations",
        description: "Reliable power infrastructure planning and maintenance consulting.",
        longDescription: "Your operation depends on stable power. We offer expert consulting for power transformers and electrical substations, covering everything from specification and installation to condition monitoring and lifecycle management.",
        features: ["Transformer Health Assessment", "Substation Design Consulting", "Load Flow Analysis", "Preventative Maintenance Planning"]
    },
    {
        title: "Water Treatment Systems",
        description: "Efficient and sustainable water management for industrial applications.",
        longDescription: "We provide engineering solutions for industrial water treatment, ensuring your systems meet environmental regulations while operating efficiently. Our expertise covers filtration, chemical treatment, and wastewater management.",
        features: ["Filtration System Design", "Chemical Treatment Optimization", "Wastewater Management", "Sustainability Audits"]
    }
];

const Services = () => {
    return (
        <div className="services-page">
            <section className="hero" style={{ height: '60vh', minHeight: '400px' }}>
                <div className="container hero-content">
                    <h1>Our Expertise</h1>
                    <p>Comprehensive engineering and AI solutions designed for the modern industrial landscape.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="services-detailed-list">
                        {servicesList.map((service, index) => (
                            <div key={index} className="service-detailed-item" style={{
                                marginBottom: '6rem',
                                padding: '3rem',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '2px'
                            }}>
                                <div style={{ maxWidth: '800px' }}>
                                    <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>{service.title}</h2>
                                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--color-text)' }}>
                                        {service.longDescription}
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        {service.features.map((feature, fIndex) => (
                                            <div key={fIndex} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: 'var(--color-text-muted)',
                                                fontSize: '0.95rem'
                                            }}>
                                                <span style={{ color: 'var(--color-secondary)' }}>▹</span> {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--color-primary)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'var(--color-secondary)' }}>Ready to Optimize Your Facility?</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', color: 'var(--color-text-muted)' }}>
                        Contact us today to discuss how AIJ Consulting can bring expert solutions to your specific challenges.
                    </p>
                    <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
