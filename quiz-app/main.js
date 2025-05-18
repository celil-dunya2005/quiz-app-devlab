const quizData = [
  { 
    "question": "What does HTML stand for?", 
    "options": [ 
      "Hyper Text Markup Language", 
      "Home Tool Markup Language", 
      "Hyperlinks and Text Markup Language", 
      "Hyper Tool Modern Language" 
    ], 
    "correctIndex": 0 
  }, 
  { 
    "question": "Which tag is used to create a hyperlink in HTML?", 
    "options": [ 
      "<a>", 
      "<link>", 
      "<href>", 
      "<hyperlink>" 
    ], 
    "correctIndex": 0 
  }, 
  { 
    "question": "What does CSS stand for?", 
    "options": [ 
      "Cascading Style Sheet", 
      "Colorful Style Sheet", 
      "Creative Style Syntax", 
      "Computer Style Sheet" 
    ], 
    "correctIndex": 0 
  }, 
  { 
    "question": "Which CSS property is used to change text color?", 
    "options": [ 
      "font-color", 
      "text-color", 
      "color", 
      "text-style" 
    ], 
    "correctIndex": 2 
  }, 
  { 
    "question": "Which JavaScript keyword is used to declare a variable?", 
    "options": [ 
      "var", 
      "let", 
      "const", 
      "All of the above" 
    ], 
    "correctIndex": 3 
  }, 
  { 
    "question": "How do you write a comment in JavaScript?", 
    "options": [ 
      "// This is a comment", 
      "# This is a comment", 
      "/* This is a comment */", 
      "-- This is a comment" 
    ], 
    "correctIndex": 0 
  } 
];

const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionNumber = document.getElementById('question-number');
const progressBar = document.getElementById('progress');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const scoreMessage = document.getElementById('score-message');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    
    showQuestion();
    
    totalQuestionsElement.textContent = quizData.length;
    
    questionContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    
    updateProgress();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    answered = false;
    feedback.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    questionText.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', () => selectOption(index));
        
        optionsContainer.appendChild(optionElement);
    });
    
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${quizData.length}`;
    
    updateProgress();
}

function selectOption(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.correctIndex;
    
    const options = optionsContainer.querySelectorAll('.option');
    
    options.forEach(option => {
        option.classList.add('disabled');
    });
    
    if (selectedIndex === correctIndex) {
        options[selectedIndex].classList.add('correct');
        feedback.textContent = 'Correct!';
        feedback.classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[correctIndex].classList.add('correct');
        feedback.textContent = 'Incorrect! The correct answer is: ' + currentQuestion.options[correctIndex];
        feedback.classList.add('incorrect');
    }
    
    feedback.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    scoreElement.textContent = score;
    
    const percentage = (score / quizData.length) * 100;
    
    if (percentage === 100) {
        scoreMessage.textContent = 'Perfect! You got all questions right!';
    } else if (percentage >= 80) {
        scoreMessage.textContent = 'Great job! You have excellent knowledge!';
    } else if (percentage >= 60) {
        scoreMessage.textContent = 'Good effort! Keep learning!';
    } else if (percentage >= 40) {
        scoreMessage.textContent = 'Not bad, but there\'s room for improvement.';
    } else {
        scoreMessage.textContent = 'Keep studying and try again!';
    }
}

function updateProgress() {
    const progressPercentage = ((currentQuestionIndex) / quizData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', initQuiz);

document.addEventListener('DOMContentLoaded', initQuiz);