import React from 'react';

// Real heading text stays selectable and accessible; only its visual letters move.
export default function PhaseTitle({ chapter }) {
  return (
    <h2 className="home-phase-title" aria-label={chapter.heading}>
      <span className="home-phase-word" aria-hidden="true">
        {[...chapter.heading].map((letter, index) => (
          <span className="home-phase-letter" style={{ '--letter': index }} key={index}>{letter}</span>
        ))}
        <span className="home-phase-period" style={{ '--letter': chapter.heading.length }}>.</span>
      </span>
    </h2>
  );
}
