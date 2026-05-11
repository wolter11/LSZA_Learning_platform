/* js/map-activity.js */
let map;
let currentTarget = null;
let score = 0;
let isRoundActive = false;

function initMap() {
	
	// Map options
	let mapOptions = {
    center: [46.002171, 8.907756],
    zoom: 10,
    zoomControl: true, // Set to false to remove +/i buttons
    dragging: true
	}
	
    // Initialize map centered on world
    map = L.map('map',mapOptions);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Handle map click
    map.on('click', handleMapClick);
    
    startRound();
}

function startRound() {
    if (MAP_COUNTRIES.length === 0) {
        document.getElementById('feedback').textContent = "All locations completed!";
        document.getElementById('next-btn').style.display = 'none';
        return;
    }

    // Pick random country
    const index = Math.floor(Math.random() * MAP_COUNTRIES.length);
    currentTarget = MAP_COUNTRIES[index];
    
    document.getElementById('target-name').textContent = currentTarget.name;
    document.getElementById('feedback').textContent = "Click on the map where " + currentTarget.name + " is located.";
    document.getElementById('next-btn').style.display = 'none';
    isRoundActive = true;

    // Remove old markers if any (simple implementation)
    // In a real app, manage markers in an array
}

function handleMapClick(e) {
    if (!isRoundActive || !currentTarget) return;

    const userLat = e.latlng.lat;
    const userLng = e.latlng.lng;
    const targetLat = currentTarget.lat;
    const targetLng = currentTarget.lng;

    // Calculate distance (simplified)
    const distance = getDistanceFromLatLonInKm(userLat, userLng, targetLat, targetLng);
    
    // Threshold: 1000km tolerance
    if (distance < 1000) {
        document.getElementById('feedback').textContent = "Correct! 🎉";
        document.getElementById('feedback').style.color = "var(--success)";
        score += 10;
        saveScore('map', score);
    } else {
        document.getElementById('feedback').textContent = `Incorrect. Distance: ${Math.round(distance)}km away.`;
        document.getElementById('feedback').style.color = "var(--error)";
    }

    document.getElementById('score-display').textContent = score;
    isRoundActive = false;
    document.getElementById('next-btn').style.display = 'block';
}

document.getElementById('next-btn').addEventListener('click', () => {
    // Remove country from list to avoid repetition
    const index = MAP_COUNTRIES.findIndex(c => c.name === currentTarget.name);
    if (index > -1) MAP_COUNTRIES.splice(index, 1);
    startRound();
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; 
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

// Initialize
initMap();