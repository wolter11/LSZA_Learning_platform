/* js/airplane-activity.js */
let currentPlaneIndex = 0;
let score = 0;
let planesToIdentify = [...AIRPLANES]; // Copy array

function loadPlane() {
    if (planesToIdentify.length === 0) {
        showResults();
        return;
    }

    const plane = planesToIdentify[0];
    document.getElementById('plane-img').src = plane.image;
    document.getElementById('plane-round').textContent = AIRPLANES.length - planesToIdentify.length + 1;
    document.getElementById('plane-total').textContent = AIRPLANES.length;
    
    const container = document.getElementById('plane-options');
    container.innerHTML = '';
    document.getElementById('plane-explanation').style.display = 'none';
    document.getElementById('next-plane-btn').style.display = 'none';

    // Generate options: 1 correct + 2 random wrong
    let options = [plane];
    const otherPlanes = AIRPLANES.filter(p => p.name !== plane.name);
    const wrongPlanes = otherPlanes.sort(() => 0.5 - Math.random()).slice(0, 2);
    options = options.concat(wrongPlanes);
    
    // Shuffle
    options.sort(() => 0.5 - Math.random());

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.name;
        btn.onclick = () => checkPlane(opt.name, plane.name, btn);
        container.appendChild(btn);
    });
}

function checkPlane(selected, correct, btn) {
    if (selected === correct) {
        btn.classList.add('correct');
        score += 10;
        document.getElementById('plane-score').textContent = score;
    } else {
        btn.classList.add('wrong');
        // Highlight correct
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => {
            if (b.textContent === correct) b.classList.add('correct');
        });
    }

    const exp = document.getElementById('plane-explanation');
    const currentPlane = AIRPLANES.find(p => p.name === correct);
    exp.textContent = currentPlane.explanation;
    exp.style.display = 'block';
    exp.style.color = selected === correct ? 'var(--success)' : 'var(--text-main)';
    
    document.getElementById('next-plane-btn').style.display = 'inline-block';
}

document.getElementById('next-plane-btn').addEventListener('click', () => {
    planesToIdentify.shift(); // Remove first item
    loadPlane();
});

function showResults() {
    document.getElementById('plane-container').style.display = 'none';
    document.getElementById('plane-results').style.display = 'block';
    document.getElementById('plane-final-score').textContent = score + " / " + (AIRPLANES.length * 10);
}

loadPlane();