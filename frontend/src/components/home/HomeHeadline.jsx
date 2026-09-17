import React from 'react';

// Shared emphasis keeps desktop, mobile and reduced-motion chapters consistent.
// Split the original string so wording, punctuation and selectable text survive.
const CHAPTER_EMPHASIS = {
  'Physical AI': 'Physical AI',
  Cameras: 'Cameras',
  'Zevric Edge': 'Zevric',
  'Datacenter Servers': 'Servers',
  'Custom IoT': 'Custom IoT',
  'Autonomous Systems': 'Autonomous systems',
};

export default function HomeHeadline({ chapter }) {
  const emphasis = CHAPTER_EMPHASIS[chapter.label];
  const start = emphasis ? chapter.heading.indexOf(emphasis) : -1;
  if (start < 0) return chapter.heading;

  return (
    <>
      {chapter.heading.slice(0, start)}
      <span className="hmpg-heading-accent">{emphasis}</span>
      {chapter.heading.slice(start + emphasis.length)}
    </>
  );
}
