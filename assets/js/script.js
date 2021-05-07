// Set Globals
var timeLeft = 75;
var timerEl = document.getElementById('remaining-time');

//Create questions for the quiz
var questionDeck = [
    {   "questionID": "0",
        "questionType": "ok",
        "numberChoices": "2",
        "questionText": "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score and reduce your time limit by 10 seconds.",
        "answerRight": "Ready to Start!",
        "answerWrong1": "Waiting for a bit"
    },  
    {   "questionID": "1",
        "questionType": "choice",
        "numberChoices": "2",
        "questionText": "If you save your array of objects to the browser’s local storage and it looks like [Object object] when you visit it in Chrome’s DevTools, what’s wrong?",
        "answerRight": "The array wasn’t stringified with JSON.stringify() before saving it in Local Storage.",
        "answerWrong1": "The array wasn’t parsed with JSON.parse() before saving it to Local Storage."
    },
    {   "questionID": "2",
        "questionType": "choice",
        "numberChoices": "4",
        "questionText": "How would you console log the computer's RAM?",
        "answerRight": "console.log(computer.ram);",
        "answerWrong1": "console.log(computer[ram]);",
        "answerWrong2": "console.log(computer(ram));",
        "answerWrong3": "console.log(computer->ram);"
    },
    {   "questionID": "3",
        "questionType": "choice",
        "numberChoices": "4",
        "questionText": "How would you call the object's startup method?",
        "answerRight": "computer.startUp();",
        "answerWrong1": "computer.startUp;",
        "answerWrong2": "computer.startup{};",
        "answerWrong3": "computer['startUp'];"
    },
    {   "questionID": "4",
        "questionType": "choice",
        "numberChoices": "4",
        "questionText": "In this.startUp(), what does this refer to?",
        "answerRight": "The computer object",
        "answerWrong1": "The startUp() method",
        "answerWrong2": "The JavaScript file",
        "answerWrong3": "The window object;"
    },
    {   "questionID": "5",
        "questionType": "truefalse",
        "numberChoices": "2",
        "questionText": "True or False: The method event.preventDefualt(); is used to instruct the browser to not carry out its default behavior.",
        "answerRight": "True",
        "answerWrong1": "False"
    },
    {   "questionID": "6",
        "questionType": "choice",
        "numberChoices": "4",
        "questionText": "When we are attempting to select an HTML element by one of it's attributes, we must use:",
        "answerRight": "[]",
        "answerWrong1": "#",
        "answerWrong2": ".get-attribute",
        "answerWrong3": ".querySelector()"
    },
    {   "questionID": "7",
        "questionType": "choice",
        "numberChoices": "4",
        "questionText": "What command do we use in Chrome DevTools to display the console data as a Javascript object?",
        "answerRight": "console.dir()",
        "answerWrong1": "console.log()",
        "answerWrong2": "console.event()",
        "answerWrong3": "console.object()"
    },
    {   "questionID": "8",
        "questionType": "choice",
        "numberChoices": "4",
        "questionText": "Which property allows us to write HTML tags inside the string value we're giving it?",
        "answerRight": "innerHTML",
        "answerWrong1": "textContext",
        "answerWrong2": "appendChild()",
        "answerWrong3": "None of the above"
    },
    {   "questionID": "9",
        "questionType": "truefalse",
        "numberChoices": "2",
        "questionText": "True or False: Lexical scoping refers to the concept that any variables created within the curly braces of a function only exist within that function's braces",
        "answerRight": "True",
        "answerWrong1": "False"
    },
    {   "questionID": "10",
        "questionType": "choice",
        "numberChoices": "4",
        "questionText": "How do we use JavaScript to get the information entered into a form’s input field?",
        "answerRight": "We can select the form’s input element and use the value property to read its data.",
        "answerWrong1": "We can select the form itself and use the value property to read all of its data.",
        "answerWrong2": "We can select the form’s input element and use the textContent or innerHTML properties to read its data.",
        "answerWrong3": "None of the above"
    },
    {   "questionID": "11",
        "questionType": "choice",
        "numberChoices": "4",
        "questionText": "The browser event submit allows us to do the following:",
        "answerRight": "Submit a form using EITHER a button or the Enter key",
        "answerWrong1": "Submit a form using ONLY the Enter key",
        "answerWrong2": "Submit a form using ONLY a button",
        "answerWrong3": "None of the above"
    },
    {   "questionID": "12",
        "questionType": "ok",
        "numberChoices": "1",
        "questionText": "Congratulations! You finished all the questions within the time limit.",
        "answerRight": "Yippee!",
    }
]   

var getRandomNumber = function (x, y){
        x = Math.ceil(x);
        y = Math.floor(y);
        var randomNumber = Math.floor(Math.random() * (y - x + 1)) + x;
        console.log("Random number is: " + randomNumber)
        return randomNumber
    }

function updateQuestion(question){
    var questionNumber = question.questionID;
    if (questionNumber === "0") {
        //This is the title screen before the start of the game
        //Using this to setup the HTML structure
        var mainEl = document.querySelector("main");
        var questionTitleEl = document.createElement("div");
        questionTitleEl.className = "questionTitleArea"
        var questionTextEl = document.createElement("div");
        questionTextEl.className = "questionTextArea"
        questionTitleEl.innerHTML = "<h1 class='main-title' id='title'>Coding Quiz Challenge</h1>"
        mainEl.appendChild(questionTitleEl)
        questionTextEl.innerHTML = "<h2 class='main-question' id='Question0'>" + question.questionText + "</h2>";
        mainEl.appendChild(questionTextEl)
        var answerTextEl = document.createElement("div");
        answerTextEl.className = "main-answers";
        mainEl.appendChild(answerTextEl);
        //Creating the 4 answer buttons
        for (var i=1; i<5; i++) {
            var answerButtonEl = document.createElement("button");
            var setAnswerButtonId = "btn-answer-" + i.toString();
            answerButtonEl.className = ("btn-answer")
            answerButtonEl.setAttribute("id", setAnswerButtonId)
            if (i==1){
                answerButtonEl.textContent = "Ready to Start Quiz"
                answerTextEl.appendChild(answerButtonEl)}
            else
                {answerButtonEl.hidden = true
                answerTextEl.appendChild(answerButtonEl)}
        }
    }
    if (questionNumber!=="0"){
        //The game has started
        console.log("The game's afoot with question: " + questionNumber)
        var questionTextEl = document.getElementsByClassName("main-question")
        questionTextEl.innerHTML = "<h2 class='main-question' id='Question'" + questionNumber + ">" + question.questionText + "</h2>";
    
        //Create a random location for the correct answer

        var correctAnswerLocation = getRandomNumber(1,parseInt(question.numberChoices))
        var wrongAnswerLocation=0; // so we'll know where to put the remaining wrong answers
        console.log("Number of choices is: " + question.numberChoices.toString())

        //Hiding or showing answer buttons based on number of choices for each question.
        for (var i=1; i<=4; i++){
            var customIdName = "btn-answer-" + i.toString()
            console.log(customIdName)
            var buttonEl = document.getElementById(customIdName)
            if (i <= parseInt(question.numberChoices)){
                buttonEl.hidden = false
                } 
            else{
                buttonEl.hidden = true
            }    
        }
        //
        i=1
        while (i<=parseInt(question.numberChoices)){
            customIDName = "btn-answer-" + i.toString()
            buttonEl = document.getElementById(customIDName)
            wrongAnswerLocation = wrongAnswerLocation +1;
            debugger
            console.log("Correct answer location number is: " + correctAnswerLocation.toString())
            console.log("Wrong answer location number is: " + wrongAnswerLocation.toString())
            if (i === correctAnswerLocation){
                //This is where we put the right answer
                buttonEl.textContent = question.answerRight;
                buttonEl.setAttribute("data-answer","correct");
                wrongAnswerLocation=wrongAnswerLocation-1
                i=i+1
                }
            else {
            //This is where we put a wrong answer
            switch (wrongAnswerLocation){
                case 1: 
                    buttonEl.textContent = question.answerWrong1
                    buttonEl.setAttribute("data-answer", "wrong")
                    i=i+1
                    break;
                case 2: 
                    buttonEl.textContent = question.answerWrong2
                    buttonEl.setAttribute("data-answer", "wrong")
                    i=i+1
                    break;
                default: 
                    buttonEl.textContent = question.answerWrong3
                    buttonEl.setAttribute("data-answer", "wrong")
                    i=i+1
                    break;
                }
            } 
        }
    }
 } //end function

function checkAnswer(buttonPressed){
    //TODO
}


 function waitforanswer() {
    var downloadTimer = setInterval(function(){
      if(timeLeft <= 0){
        clearInterval(downloadTimer);
      }
      document.getElementById("remaining-time").value = timeLeft;
      timeLeft -= 1;
    }, 1000);
    var answerButton1El = document.getElementById("btn-answer-1")
    var answerButton2El = document.getElementById("btn-answer-2")
    var answerButton3El = document.getElementById("btn-answer-3")
    var answerButton4El = document.getElementById("btn-answer-4")
    answerButton1El(addEventListener('click', checkAnswer(1)))
    answerButton2El(addEventListener('click', checkAnswer(2)))
    answerButton3El(addEventListener('click', checkAnswer(3)))
    answerButton4El(addEventListener('click', checkAnswer(4)))
}


// Function to setup how the beginning screen looks
function startQuiz(){
    //loop through all the questions in the deck
    console.log ("Starting Quiz")
    for (var i=1; i<questionDeck.length; i++){
        bAnswered=false
        updateQuestion(questionDeck[i]);
        while (!bAnswered && (timeLeft>0)){
            waitforanswer();
        }
        debugger;

        //TODO: Answer event listener
        
        debugger
    }

}

// Show title screen 
updateQuestion(questionDeck[0], false);
var beginQuizEl = document.getElementById("btn-answer-1")
beginQuizEl.addEventListener('click',startQuiz)

