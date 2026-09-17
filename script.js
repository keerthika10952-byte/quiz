
const questions = [

    {
        question: "Who is the main protagonist of Alice in Borderland?",
        options: ["Arisu", "Chishiya", "Aguni", "Niragi"],
        answer: "Arisu"
    },

    {
        question: "What is Arisu's full name?",
        options: [
            "Ryohei Arisu",
            "Shuntaro Arisu",
            "Takeru Arisu",
            "Daikichi Arisu"
        ],
        answer: "Ryohei Arisu"
    },

    {
        question: "What happens to Arisu and his friends before entering the Borderland?",
        options: [
            "They get on a train",
            "They witness strange fireworks",
            "They enter a mysterious building",
            "They fall asleep"
        ],
        answer: "They witness strange fireworks"
    },

    {
        question: "What do the playing cards represent?",
        options: [
            "Different countries",
            "Different types of games",
            "Different characters",
            "Different weapons"
        ],
        answer: "Different types of games"
    },

    {
        question: "What does the ♥ suit generally represent?",
        options: [
            "Physical strength",
            "Intelligence",
            "Psychological games",
            "Team racing"
        ],
        answer: "Psychological games"
    },

    {
        question: "What does the ♠ suit generally focus on?",
        options: [
            "Physical challenges",
            "Love",
            "Memory",
            "Cooking"
        ],
        answer: "Physical challenges"
    },

    {
        question: "What does the ♦ suit generally represent?",
        options: [
            "Physical strength",
            "Intelligence",
            "Luck",
            "Friendship"
        ],
        answer: "Intelligence"
    },

    {
        question: "What does the ♣ suit generally emphasize?",
        options: [
            "Teamwork",
            "Cooking",
            "Music",
            "Memory"
        ],
        answer: "Teamwork"
    },

    {
        question: "Who is known for being highly intelligent and calculating?",
        options: [
            "Chishiya",
            "Kuina",
            "Aguni",
            "Tatta"
        ],
        answer: "Chishiya"
    },

    {
        question: "Who is Kuina?",
        options: [
            "A game dealer",
            "A skilled fighter and Arisu's ally",
            "The Queen of Hearts",
            "A police officer"
        ],
        answer: "A skilled fighter and Arisu's ally"
    },

    {
        question: "What is Usagi especially skilled at?",
        options: [
            "Climbing and survival",
            "Computer programming",
            "Cooking",
            "Driving"
        ],
        answer: "Climbing and survival"
    },

    {
        question: "Who is known as the 'Mad Hatter'?",
        options: [
            "Aguni",
            "Tatta",
            "Hatter",
            "Chishiya"
        ],
        answer: "Hatter"
    },

    {
        question: "What is the Beach?",
        options: [
            "A normal holiday resort",
            "A community where Borderland players gather",
            "A game arena",
            "A train station"
        ],
        answer: "A community where Borderland players gather"
    },

    {
        question: "What happens when a player's Visa expires?",
        options: [
            "They leave the Borderland",
            "They receive more points",
            "They die",
            "They become a dealer"
        ],
        answer: "They die"
    },

    {
        question: "What is the main goal of the players?",
        options: [
            "Collect money",
            "Find a way to survive and return to their world",
            "Become famous",
            "Build the Beach"
        ],
        answer: "Find a way to survive and return to their world"
    },

    {
        question: "Who is Mira?",
        options: [
            "Queen of Hearts",
            "Queen of Clubs",
            "A player from Arisu's group",
            "A dealer"
        ],
        answer: "Queen of Hearts"
    },

    {
        question: "What kind of game is the Queen of Hearts game?",
        options: [
            "A psychological game",
            "A racing game",
            "A fighting game",
            "A cooking game"
        ],
        answer: "A psychological game"
    },

    {
        question: "Which character is especially skilled in martial arts?",
        options: [
            "Kuina",
            "Tatta",
            "Hatter",
            "Ann"
        ],
        answer: "Kuina"
    },

    {
        question: "What is one major theme of Alice in Borderland?",
        options: [
            "Survival",
            "Cooking",
            "Space travel",
            "School competitions"
        ],
        answer: "Survival"
    },

    {
        question: "What does Arisu often use to survive games?",
        options: [
            "His intelligence and problem-solving",
            "Only physical strength",
            "Money",
            "Technology"
        ],
        answer: "His intelligence and problem-solving"
    }

];


let currentUser = "";
let timeLeft = 600; // 10 minutes
let timerInterval;

function startQuiz() {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (username === "" || email === "") {
        document.getElementById("loginError").innerText =
            "⚠️ Please enter your name and email.";
        return;
    }

    currentUser = username;

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("quizPage").classList.remove("hidden");

    document.getElementById("welcomeUser").innerText =
        "Player: " + currentUser;

    loadQuestions();

    startTimer();
}

function loadQuestions() {

    const quiz = document.getElementById("quiz");

    quiz.innerHTML = "";

    questions.forEach((q, index) => {

        const questionCard = document.createElement("div");

        questionCard.classList.add("question-card");

        let optionsHTML = "";

        q.options.forEach(option => {

            optionsHTML += `
                <label class="option">
                    <input 
                        type="radio"
                        name="question${index}"
                        value="${option}">
                    ${option}
                </label>
            `;

        });

        questionCard.innerHTML = `
            <h2>
                ${index + 1}. ${q.question}
            </h2>

            ${optionsHTML}
        `;

        quiz.appendChild(questionCard);

    });

    updateProgress();

}

function updateProgress() {

    const progress =
        (questions.length / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

    document.getElementById("questionNumber").innerText =
        "🎴 20 QUESTIONS • CHOOSE YOUR ANSWERS";
}

function startTimer() {

    timerInterval = setInterval(() => {

        timeLeft--;

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").innerText =
            `${minutes}:${seconds}`;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert("⏰ Time is over!");

            submitQuiz();

        }

    }, 1000);
}

function submitQuiz() {

    clearInterval(timerInterval);

    let score = 0;

    questions.forEach((q, index) => {

        const selected =
            document.querySelector(
                `input[name="question${index}"]:checked`
            );

        if (selected && selected.value === q.answer) {
            score++;
        }

    });

    showResult(score);
}

function showResult(score) {

    document.getElementById("quizPage")
        .classList.add("hidden");

    document.getElementById("resultPage")
        .classList.remove("hidden");

    const percentage =
        Math.round((score / questions.length) * 100);

    document.getElementById("score").innerText =
        score;

    document.getElementById("percentage").innerText =
        percentage + "%";

    document.getElementById("playerName").innerText =
        currentUser;

    document.getElementById("correctAnswers").innerText =
        score;

    document.getElementById("wrongAnswers").innerText =
        questions.length - score;


    let message = "";

    if (percentage >= 90) {
        message = "🔥 You are a true Borderland survivor!";
    }
    else if (percentage >= 70) {
        message = "⚡ Excellent! You survived the games!";
    }
    else if (percentage >= 50) {
        message = "🎴 Good attempt! Keep training!";
    }
    else {
        message = "💀 The Borderland defeated you... Try again!";
    }

    document.getElementById("performance").innerText =
        message;

    document.getElementById("resultMessage").innerText =
        "Your game has ended, " + currentUser + ".";
}



function restartQuiz() {

    currentUser = "";
    timeLeft = 600;

    document.getElementById("resultPage")
        .classList.add("hidden");

    document.getElementById("loginPage")
        .classList.remove("hidden");

    document.getElementById("username").value = "";
    document.getElementById("email").value = "";

    document.getElementById("timer").innerText = "10:00";
}
