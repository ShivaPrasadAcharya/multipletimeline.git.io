import React, { useState, useEffect, useRef } from 'react';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import { timelineData } from './timelineData';

function App() {
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedTimeline, setSelectedTimeline] = useState('timeline1');

  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      height: '100%',
      min: new Date('1700-01-01'),
      max: new Date('2025-12-31'),
      zoomMin: 1000 * 60 * 60 * 24 * 30,
      zoomMax: 1000 * 60 * 60 * 24 * 366 * 300,
      orientation: 'vertical',
      verticalScroll: true,
      horizontalScroll: false,
      zoomKey: 'ctrlKey',
      stack: false,
      margin: {
        item: {
          vertical: 15
        }
      }
    };

    timelineRef.current = new Timeline(
      containerRef.current,
      timelineData[selectedTimeline].items,
      options
    );

    return () => {
      if (timelineRef.current) {
        timelineRef.current.destroy();
      }
    };
  }, [selectedTimeline]);

  const handleTimelineChange = (event) => {
    setSelectedTimeline(event.target.value);
  };

  return (
    <div className="app">
      <header>
        <h1>Interactive Timelines</h1>
        <nav>
          <select value={selectedTimeline} onChange={handleTimelineChange}>
            <option value="timeline1">Technology Evolution</option>
            <option value="timeline2">Historical Events</option>
            <option value="timeline3">Scientific Discoveries</option>
          </select>
        </nav>
      </header>

      <main>
        <div ref={containerRef} className="timeline-container"></div>
      </main>

      <footer>
        <p>&copy; 2024 Multiple Timeline Project</p>
      </footer>
    </div>
  );
}

export default App;
