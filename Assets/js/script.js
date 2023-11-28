var questions = [ 

    {
        prompt: 'What does HTML stand for?',
        choices: [
            "HighText Machine Language",
            "HyperText and links Markup Language",
            "HyperText Markup Language",
            "None of the above",
        ],
        answer: "HyperText Markup Language",
    },

    {
        prompt: 'What is the correct sequence of HTML tags for starting a webpage?',
        choices: [
            "Head, Title, HTML, Body",
            "HTML, Body, Title, Head",
            "HTML, Head, Title, Body",
            "HTML, Head, Title, Body",
        ],
        answer: "HTML, Head, Title, Body",
    },

    {
        prompt: 'Which of the following do you use to start an unordered list?',
        choices: [
            "<ul>",
            "<ol>",
            "<li>",
            "<i>",
        ],
        answer: "<ul>",
    },

    {
        prompt: 'Which of the following tag is used to embed css in html page?',
        choices: [
            "<css>",
            "<!DOCTYPE html>",
            "<script>",
            "<style>",
        ],
        answer: "<style>",
    },

    {
        prompt: 'Which of the following CSS selector is used to specify a rule to bind a particular unique element?',
        choices: [
        "tag",
        "id",
        "class",
        "both class and tag",
    ],
        answer: "id",
    },

    {
        prompt: 'Which of the following keywords is used to define a variable in Javascript?',
        choices: [
            "var",
            "let",
            "Both A and B",
            "None of the above",
        ],
        answer: "Both A and B",
    },

        {
        prompt: 'Which of the following is used to serialize an object into JSON string in Javascript?',
        choices: [
            "stringify()",
            "parse()",
            "convert()",
            "None of the above",
        ],
        answer: "stringify()",
    },
];



let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#choices"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#start"); 
let nameEl = 
	document.querySelector("#name"); 
let feedbackEl = document.querySelector(
    "#feedback"
);    

let reStartBtn = 
	document.querySelector("#restart"); 


let currentQuestionIndex = 0; 
let time =  questions.length * 10; 
let timerId; 



function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let beginningScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	beginningScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 


function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"questionaire"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.choices.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 



function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 10;
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 


function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"end-quiz"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"final-score"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 


function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 


function saveHighscore() { 
	let name = nameEl.value.trim(); 
	if (name !== "") { 
		let highscores = 
			JSON.parse( 
				window.localStorage.getItem( 
					"highscores"
				) 
			) || []; 
		let newScore = { 
			score: time, 
			name: name, 
		}; 
		highscores.push(newScore); 
		window.localStorage.setItem( 
			"highscores", 
			JSON.stringify(highscores) 
		); 
	} 
} 



function checkForEnter(event) { 
	if (event.key === "Enter") { 
		saveHighscore(); 
	} 
} 
nameEl.onkeyup = checkForEnter; 



submitBtn.onclick = saveHighscore; 



startBtn.onclick = quizStart;
