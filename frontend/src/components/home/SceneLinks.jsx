import { Link } from 'react-router-dom';

export default function SceneLinks({ chapter }) {
  if (!chapter.actions?.length) return null;

  return (
    <nav className="home-scene-links" aria-label={`Explore ${chapter.label} products`}>
      {chapter.actions.map(({ label, to }) => (
        <Link className="home-scene-link" to={to} key={to}>
          <span>{label}</span><span aria-hidden="true">↗</span>
        </Link>
      ))}
    </nav>
  );
}
