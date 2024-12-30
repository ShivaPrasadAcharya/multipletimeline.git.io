document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const container = document.getElementById('timeline-container');
    const selector = document.getElementById('timelineSelector');
    
    // Timeline options for vertical orientation
    const options = {
        height: '100%',
        min: new Date('1700-01-01'),
        max: new Date('2025-12-31'),
        zoomMin: 1000 * 60 * 60 * 24 * 30, // One month
        zoomMax: 1000 * 60 * 60 * 24 * 366 * 300, // 300 years
        orientation: 'vertical', // Set vertical orientation
        verticalScroll: true, // Enable vertical scrolling
        horizontalScroll: false, // Disable horizontal scrolling
        zoomKey: 'ctrlKey', // Zoom only when ctrl key is pressed
        stack: false, // Prevent items from stacking
        margin: {
            item: {
                vertical: 15 // Add vertical spacing between items
            }
        },
        format: { // Customize date format
            minorLabels: {
                year: 'YYYY',
                month: 'MMM',
                day: 'D'
            }
        }
    };

    // Initialize timeline
    let timeline = new vis.Timeline(container);

    // Function to update timeline
    function updateTimeline(timelineId) {
        const data = timelineData[timelineId];
        const items = new vis.DataSet(data.items);
        
        timeline.setOptions(options);
        timeline.setItems(items);
        
        // Set initial window to show all items
        const allItems = items.get();
        const dates = allItems.map(item => new Date(item.start));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        
        // Add padding to the window
        minDate.setFullYear(minDate.getFullYear() - 1);
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        
        timeline.setWindow(minDate, maxDate);

        // Fit all items after a short delay to ensure proper rendering
        setTimeout(() => {
            timeline.fit();
        }, 100);
    }

    // Event listener for timeline selector
    selector.addEventListener('change', function(e) {
        updateTimeline(e.target.value);
    });

    // Initialize with first timeline
    updateTimeline('timeline1');

    // Add window resize handler
    window.addEventListener('resize', function() {
        timeline.redraw();
    });
});
