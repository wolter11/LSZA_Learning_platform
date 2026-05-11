/* js/quiz-activity.js */
let currentQuestionIndex = 0;
let score = 0;
let quizActive = true;

function loadQuestion() {
    if (currentQuestionIndex >= QUIZ_DATA.length) {
        showResults();
        return;
    }

    const q = QUIZ_DATA[currentQuestionIndex];
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('q-current').textContent = currentQuestionIndex + 1;
    document.getElementById('q-total').textContent = QUIZ_DATA.length;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('next-q-btn').style.display = 'none';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    if (!quizActive) return;
    quizActive = false; // Prevent multiple clicks

    const q = QUIZ_DATA[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    const explanation = document.getElementById('explanation');

    if (selectedIndex === q.answer) {
        btnElement.classList.add('correct');
        score += 10;
        document.getElementById('quiz-score').textContent = score;
    } else {
        btnElement.classList.add('wrong');
        options[q.answer].classList.add('correct'); // Show correct one
    }

    // Show explanation
    explanation.textContent = q.explanation;
    explanation.style.display = 'block';
    explanation.style.color = selectedIndex === q.answer ? 'var(--success)' : 'var(--text-main)';
    
    document.getElementById('next-q-btn').style.display = 'inline-block';
}

document.getElementById('next-q-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    quizActive = true;
    loadQuestion();
});

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('final-score').textContent = score + " / " + (QUIZ_DATA.length * 10);
    saveScore('quiz', score);
}

// Start
loadQuestion();