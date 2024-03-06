// Define SVG dimensions
const svgWidth = window.innerWidth;
const svgHeight = window.innerHeight;

// Create SVG element
const svg = d3.select("#animated-svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Function to generate random transparency value
function getRandomOpacity() {
    return Math.random() * 0.7 + 0.1; // Random opacity between 0.3 and 1
}

// Add circles to the SVG
const numCircles = 10; // Number of circles
const circles = [];
for (let i = 0; i < numCircles; i++) {
    const circle = svg.append("circle")
        .attr("r", Math.random() * 50) // Random radius
        .attr("fill", 'grey')
        .attr("opacity", getRandomOpacity())
        .attr("cx", svgWidth / 2)
        .attr("cy", svgHeight / 2);
    circles.push(circle);
}

// Add thin connecting dashed lines
const lines = [];
for (let i = 0; i < numCircles; i++) {
    const line = svg.append("line")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "5,5") // Set dashed style
        .attr("opacity", 0.2) // Set opacity for the lines
        .attr("x1", svgWidth / 2)
        .attr("y1", svgHeight / 2)
        .attr("x2", circles[i].attr("cx"))
        .attr("y2", circles[i].attr("cy"));
    lines.push(line);
}

// Add animation to circles
function animateCircles() {
    circles.forEach((circle, index) => {
        circle.transition()
            .duration(3000)
            .attr("cx", Math.random() * svgWidth)
            .attr("cy", Math.random() * svgHeight)
            .attr("opacity", getRandomOpacity())
            .on("end", () => animateLines(index));
    });
}

// Add animation to lines
function animateLines(index) {
    lines[index].transition()
        .duration(1)
        .attr("x2", circles[index].attr("cx"))
        .attr("y2", circles[index].attr("cy"))
        .on("end", () => animateLines(index));
}

// Start initial animation
animateCircles();

// After the animation is finished, start slow movement of circles
setTimeout(() => {
    setInterval(() => {
        circles.forEach(circle => {
            circle.transition()
                .duration(3000) // Slow movement duration
                .attr("cx", Math.random() * svgWidth)
                .attr("cy", Math.random() * svgHeight);
        });
    }, 3000); // Repeat slow movement every 5 seconds
}, 1000); // Start slow movement after 2 seconds (after initial animation finishes)

// Select a random index to make a circle red
const redCircleIndex = Math.floor(Math.random() * numCircles);

// Change the fill color of the selected circle to red
circles[redCircleIndex].attr("fill", "orange").attr("opacity", 1);
