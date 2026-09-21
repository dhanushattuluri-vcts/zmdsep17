import React from 'react';

// Real heading text stays selectable and accessible; only its visual letters move.
export default function PhaseTitle({ chapter }) {
  const accentStart = Math.ceil(chapter.heading.length * .45);
  return (
    <h2 className="home-phase-title" data-phase={chapter.scene} aria-label={chapter.heading}>
      <span className="home-phase-word" aria-hidden="true">
        {[...chapter.heading].map((letter, index) => (
          <span className={`home-phase-letter${index >= accentStart ? ' is-accent' : ''}`} style={{ '--letter': index }} key={index}>{letter}</span>
        ))}
        <span className="home-phase-period" style={{ '--letter': chapter.heading.length }}>.</span>
      </span>
    </h2>
  );
}
