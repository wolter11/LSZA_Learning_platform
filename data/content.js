/* data/content.js */

const QUIZ_DATA = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2, // Index of correct answer
        explanation: "Paris has been the capital of France for centuries."
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: 1,
        explanation: "Mars appears red due to iron oxide on its surface."
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: 3,
        explanation: "The Pacific Ocean covers more than 30% of Earth's surface."
    }
];

const AIRPLANES = [
    {
        name: "Boeing 747",
        image: "images/plane1.jpg", // Replace with actual file
        explanation: "The Boeing 747 is a large, long-range wide-body airliner known as the 'Queen of the Skies'."
    },
    {
        name: "Airbus A380",
        image: "images/plane2.jpg", // Replace with actual file
        explanation: "The Airbus A380 is a double-deck, wide-body, four-engine jet airliner."
    },
    {
        name: "Cessna 172",
        image: "images/plane3.jpg", // Replace with actual file
        explanation: "The Cessna 172 is a four-seat, single-engine, high-wing, fixed-wing aircraft."
    }
];

const MAP_COUNTRIES = [
    { name: "France", lat: 46.2276, lng: 2.2137 },
    { name: "Japan", lat: 36.2048, lng: 138.2529 },
    { name: "Brazil", lat: -14.2350, lng: -51.9253 },
    { name: "Australia", lat: -25.2744, lng: 133.7751 }
];