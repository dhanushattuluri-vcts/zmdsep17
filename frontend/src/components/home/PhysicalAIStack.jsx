import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Server, PanelsTopLeft, ChartLine } from 'lucide-react';
import ecosystem from '../../assets/images/home-stack/ecosystem.webp';
import raisedEcosystem from '../../assets/images/home-stack/ecosystem-raised.webp';
import sense from '../../assets/images/home-stack/sense.webp';
import edge from '../../assets/images/home-stack/edge.webp';
import datacenter from '../../assets/images/home-stack/datacenter.webp';
import applications from '../../assets/images/home-stack/applications.webp';
import '../../assets/css/home-stack.css';

const cards = [
  { id: 'sense', number: '01', title: 'Sense', description: 'Cameras and custom IoT products that capture the real world with industrial-grade reliability.', action: 'Explore Sense', to: '/products/cam', image: sense, alt: 'ZMD camera and IoT sensors monitoring industrial equipment' },
  { id: 'edge', number: '02', title: 'Local compute', description: 'Compact edge systems that turn real-time data into real-time insight.', action: 'Explore Edge', to: '/products/edge-box', image: edge, alt: 'Industrial edge computer connected inside a control cabinet' },
  { id: 'datacenter', number: '03', title: 'Datacenter compute', description: 'AI datacenter servers when you need more scale, more models, and more performance.', action: 'Explore Datacenter', to: '/products/server', image: datacenter, alt: 'High-density server racks in a datacenter' },
  { id: 'applications', number: '04', title: 'Intelligent applications', description: 'Enterprise data, platforms and integrations that turn intelligence into outcomes.', action: 'Explore Applications', to: '/edge-ai', image: applications, alt: 'AI application dashboard showing model performance and workflows' },
];

const nodes = [
  { id: 'sense', label: 'Sense', Icon: Camera, to: '/products/cam' },
  { id: 'datacenter', label: 'Datacenter', Icon: Server, to: '/products/server' },
  { id: 'applications', label: 'Applications', Icon: PanelsTopLeft, to: '/edge-ai' },
  { id: 'operations', label: 'Operations', Icon: ChartLine, to: '/solutions' },
];

export default function PhysicalAIStack() {
  const sectionRef = useRef(null);
  const [artReady, setArtReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        // Separate entry/exit thresholds prevent flickering at the viewport edge.
        const wasEntered = target.classList.contains('is-entered');
        const entered = target.matches(':focus-within') ||
          (isIntersecting && intersectionRatio >= (wasEntered ? .08 : .18));
        target.classList.toggle('is-entered', entered);
        if (entered) target.classList.add('has-entered');
        target.classList.toggle('is-exiting', !entered && target.classList.contains('has-entered'));
      });
    }, { threshold: [0, .08, .18], rootMargin: '-24px 0px -24px 0px' });
    observer.observe(section);
    section.querySelectorAll('[data-stack-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const revealOnFocus = (event) => {
    event.currentTarget.classList.remove('is-exiting');
    event.currentTarget.classList.add('is-entered', 'has-entered');
  };

  return (
    <section ref={sectionRef} id="home-solutions" className="physical-ai-stack" aria-labelledby="home-solutions-title">
      <div className="stack-board">
        <div className="stack-backdrop" aria-hidden="true" style={{ backgroundImage: `url(${ecosystem})` }} />
        <header className="stack-intro" data-stack-reveal>
          <p className="stack-eyebrow">A complete Physical AI stack</p>
          <h2 id="home-solutions-title" aria-label="Building Physical AI, from sensing to action"><span className="stack-heading-line"><span>Building Physical AI,</span></span><span className="stack-heading-line"><span>from sensing to action</span></span></h2>
          <span className="stack-heading-rule" aria-hidden="true" />
          <p className="stack-lede">ZMD builds the sensing and compute hardware. Customers and integrators<br className="stack-wide-break" /> add their chosen applications, data and integrations.</p>
        </header>

        <div className="stack-hub" data-stack-reveal onFocusCapture={revealOnFocus}>
          <div className={`stack-hub-float ${artReady ? 'is-ready' : ''}`}>
            <img className="stack-hub-art" src={raisedEcosystem} alt="ZMD at the heart of a connected sensing, compute and operations ecosystem" loading="lazy" decoding="async" onLoad={() => setArtReady(true)} />
          </div>
          <div className="stack-hub-nodes">
            {nodes.map(({ id, label, Icon, to }) => <Link key={id} className={`stack-node stack-node-${id}`} to={to}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></Link>)}
          </div>
          <p className="stack-hub-caption">Real-world intelligence<br />for a more capable tomorrow</p>
        </div>

        <div className="stack-connectors" aria-hidden="true">
          {['sense', 'edge', 'datacenter', 'applications'].map((id, index) => (
            <span className={`stack-wire stack-wire-${id}`} key={id} style={{ '--wire-order': index }}><i className="stack-wire-start" /><i className="stack-wire-end" /></span>
          ))}
        </div>

        <div className="stack-cards">
          {cards.map((card, index) => (
            <article key={card.id} className={`stack-card stack-card-${card.id}`} style={{ '--card-order': index }} data-stack-reveal onFocusCapture={revealOnFocus} aria-labelledby={`stack-title-${card.id}`}>
              <div className="stack-card-motion"><div className="stack-card-shell"><div className="stack-card-inner">
                <img className="stack-card-image" src={card.image} alt={card.alt} loading="lazy" />
                <div className="stack-card-copy">
                  <div className="stack-card-number"><span>{card.number}</span><i aria-hidden="true" /></div>
                  <h3 id={`stack-title-${card.id}`}>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link className="stack-card-link" to={card.to}>{card.action}<ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" /></Link>
                </div>
              </div></div></div>
            </article>
          ))}
        </div>

        <p className="stack-principles" data-stack-reveal aria-label="Sensing, compute, understand, act"><span>Sensing</span><span>Compute</span><span>Understand</span><span>Act</span></p>
      </div>
    </section>
  );
}
