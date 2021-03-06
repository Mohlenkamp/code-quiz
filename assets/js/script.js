// Set Globals
var bButtonPressed = false
var questionNumber = "0"
var bEndOfGame = false
var timeLeft
var endQuizTime
var score = 0   
var initialsText = ""

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
        "answerWrong3": "The window object"
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
        "answerRight": "Yippee!"
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
    questionNumber = question.questionID;
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
        questionTextEl.innerHTML = "<h2 class='main-question' id='Question'>" + question.questionText + "</h2>";
        mainEl.appendChild(questionTextEl)
        var labelEndGameEl = document.createElement("div")
        labelEndGameEl.id = "endGameArea"
        labelEndGameEl.hidden = true
        labelEndGameEl.innerHTML = "<span id='highScoreText'></span><label id='labelInitials' for='initials'>Enter Your Initials </label><input type='text' name='initials' id='initials' placeholder=' Initials here ' /><button id='submitInitials' type='submit'> Submit </button>"
        mainEl.appendChild(labelEndGameEl)
        var answerTextEl = document.createElement("div");
        answerTextEl.className = "main-answers";
        answerTextEl.id = "mainAnswerArea"
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
        //Create the Correct/Wrong response div
        var footerEl = document.querySelector("footer");
        var responseTextEl = document.createElement("div")
        responseTextEl.className = "responseTextArea"
        responseTextEl.innerHTML = "<h2 class='responseTextArea' id='response-value'></h2>"
        footerEl.appendChild(responseTextEl)
    }
    if (questionNumber!=="0"){
        //The game has started
        console.log("The game's afoot with question: " + questionNumber)
        var questionTextEl = document.getElementById("Question")
        questionTextEl.textContent = question.questionText
    
        // Create a random location for the correct answer
        // because it shouldn't be in the same location every time
        // or hard-coded to a location
        var correctAnswerLocation = getRandomNumber(1,parseInt(question.numberChoices))
        var wrongAnswerLocation=0; // so we'll know where to put the remaining wrong answers
        
        //console.log("Number of choices is: " + question.numberChoices.toString())

        //Hiding or showing answer buttons based on number of choices for each question.
        for (var i=1; i<=4; i++){
            customIdName = "btn-answer-" + i.toString()
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
            //console.log("Correct answer location number is: " + correctAnswerLocation.toString())
            //console.log("Wrong answer location number is: " + wrongAnswerLocation.toString())
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

function updateScore(bCorrect){
    // Don't really know what the rules should be, so I'm making this up.
    // 7 points for right answer and -3 for a wrong one... Good as any I guess   
    switch (bCorrect){
        case true:
            score = score + 7
        case false:
            score = score - 3
        default:
    }
    if (timeLeft<=0){
        bEndOfGame=true
        endQuiz()
    }
} //end function


function checkAnswer(answerPressed){
    var responseTextEl = document.getElementById("response-value")
    if (answerPressed){  
        switch (answerPressed.target.getAttribute("data-answer")){
        // This will be either "correct" or "wrong" 
        case "correct":
            console.log("Answer was correct")
            responseTextEl.textContent="Correct"
            updateScore(true);
            break;
        case "wrong":
            console.log("Answer was wrong")
            responseTextEl.textContent="Wrong"
            //if incorrect subtract 10 more seconds
            endQuizTime = new Date(endQuizTime.getTime() - 10000 );
            //endQuizTime = endQuizTime - 8000
            updateScore(false);
            break;
        default:
            //This will happen only if the data-answer value is null
            break;
        }
        // show correct or wrong on screen for 1 second then blank it
        setTimeout(function(){ responseTextEl.textContent="" }, 1000);
        console.log("show result")
        // return true so next question is queued
        bButtonPressed=true
        if (timeLeft<=0){
            bEndOfGame=true
            endQuiz()
        }
    }
} //end function

function updateTimerLabel(timeValue) {
    document.getElementById("remaining-time").textContent = timeValue;
} //end function

function endQuiz(){
    console.log("Quiz is over.... Show results" + score)
    var questionTitleEl = document.getElementById("title")
    questionTitleEl.textContent = "All Done"
    document.getElementById("Question").textContent = "Your score was: " + score
    document.getElementById("btn-answer-1").hidden = true
    document.getElementById("btn-answer-2").hidden = true
    document.getElementById("btn-answer-3").hidden = true
    document.getElementById("btn-answer-4").hidden = true 
    document.getElementById("endGameArea").hidden= false
}

function startQuiz(){
    console.log ("Starting Quiz")
    score +=50 // So everyone feels better and because I don't like negative scores
    // Turn off View Scores button
    document.getElementById("view-scores").disabled = true;
    //Create event listeners for each answer button
    // I tried to use a loop first, but for some reason, it didn't work 
    // so I just made the 4 individually to get past it.
    var answerButtonEl1 = document.getElementById("btn-answer-1")
    answerButtonEl1.addEventListener('click',checkAnswer)
    var answerButtonEl2 = document.getElementById("btn-answer-2")
    answerButtonEl2.addEventListener('click',checkAnswer)
    var answerButtonEl3 = document.getElementById("btn-answer-3")
    answerButtonEl3.addEventListener('click',checkAnswer)
    var answerButtonEl4 = document.getElementById("btn-answer-4")
    answerButtonEl4.addEventListener('click',checkAnswer)
        //start timer
        // Tried using setInterval with a standard counter but I kept getting weird drift results
        // so I have to change it to using the system clock b/c I can't rely on the counter.
    const startQuizTime = Date.now();
    endQuizTime = new Date(startQuizTime + (75 * 1000)); // This is beginning at 75 seconds from start time
    timeLeft = parseInt((endQuizTime - Date.now())/1000)
    //debugger
    var gameTimer = setInterval(function() {
        console.log("Current question: " + questionNumber)
        if (questionNumber==="0"){
            //special case for first question start b/c no need to check answer
            updateQuestion(questionDeck[1])
            updateTimerLabel("75")
        }
        else if (timeLeft > 0 && !bButtonPressed) {
            //this means the question has not been answered yet, subtract 1 sec
            //not updating screen in real time b/c there's a problem with updating the number
            //when the answer changes the timer. i get multiple updates with different
            //numbers
            timeLeft = parseInt((endQuizTime - Date.now())/1000)
            updateTimerLabel(timeLeft)
        }
        else if (timeLeft > 0 && bButtonPressed){
            //this means the question has been answered and we should queue the next
            updateQuestion(questionDeck[parseInt(questionNumber) + 1])
            bButtonPressed = false
            //show remaining time
            timeLeft = parseInt((endQuizTime - Date.now())/1000)
            updateTimerLabel(timeLeft)
            if (parseInt(questionNumber)===12){
                //we're at the end of the question deck
                timeLeft=0
                updateTimerLabel("00")
                clearInterval(gameTimer)
                endQuiz()
            }
        }  
         else {
             // this means the timer has expired
          updateTimerLabel("00")
          clearInterval(gameTimer)
          endQuiz()
        }
    }, 1000);
} //end function

function showHighScores(){
    // The local storage will hold 3 high score values from highest to lowest
    // The score will be highScore1, highScore2, and highScore3
    // and the associated initials will be highScore1Initials, etc....

    document.getElementById("highScoreText").textContent = "Current High Scores"
    // Get initials from input box
    initialText = document.querySelector('#initials').value
    var oldScore = 0
    var oldInitials = ""
    var highScore1 = ""
    var highScore2 = ""
    var highScore3 = ""
    var highScoreValue = ""
    var highScoreValueInitials = ""
    var buttonValue = ""
    // Initialize High Scores
    for (var i=1; i<4; i++){
        //Create variable to store highScore variable name as it loops
        highScoreValue = "highScore" + i.toString()
        highScoreValueInitials = highScoreValue + "Initials"
        oldScore = localStorage.getItem(highScoreValue);
        if (!oldScore){
            //Value is null, so the list is not initialized
            localStorage.setItem(highScoreValue, "0");
            localStorage.setItem(highScoreValueInitials, "");
        } 
    }
    for (var i=1; i<4; i++){
        highScoreValue = "highScore" + i.toString()
        highScoreValueInitials = highScoreValue + "Initials"
        oldScore = localStorage.getItem(highScoreValue);
            if (oldScore < score){
            //If stored value is less than score, then insert
            //Store existing entry
            oldInitials = localStorage.getItem(highScoreValueInitials);
            //Update with new high score value
            localStorage.setItem(highScoreValue, score);
            localStorage.setItem(highScoreValueInitials, initialText);
            //Now test and adjust rest of list if necessary with previous value at the lower rank
            score = oldScore
            initialText = oldInitials    
            } 
        } 
    // Display High Scores 
    // 
    // Hide/Unhide relevant targets
        document.querySelector('#labelInitials').hidden = true
        document.querySelector('#initials').hidden = true
        document.querySelector('#submitInitials').hidden = true
        

    for (var i=1; i<4; i++){
        highScoreValue = "highScore" + i.toString()
        highScoreValueInitials = highScoreValue + "Initials"
        buttonValue = "#btn-answer-" + i.toString()
        document.querySelector(buttonValue).hidden = false
        oldScore = localStorage.getItem(highScoreValue)
        oldInitials = localStorage.getItem(highScoreValueInitials)
        console.log(oldInitials + "  " + oldScore)
        document.querySelector(buttonValue).textContent = oldInitials + "   " + oldScore + " points"
    }
    //debugger
    // Unhide Go Back button and Clear Scores button in footer
    document.querySelector("#footerButtons").hidden = false
    document.querySelector("#goBack").hidden = false
    document.querySelector("#clearScores").hidden = false
}

// ************** Begin Main Code ******************** //


// Hide footer buttons until the end of game
document.querySelector("#footerButtons").hidden = true
document.querySelector("#goBack").hidden = true
document.querySelector("#clearScores").hidden = true

// Show quiz start screen 
updateQuestion(questionDeck[0])
var beginQuizEl = document.getElementById("btn-answer-1")
//researched this extra parameter b/c I only wanted it to fire once and then de-register.
// https://www.amitmerchant.com/remove-event-listener-once-invoked-javascript/
beginQuizEl.addEventListener("click",startQuiz,{once: true})
var viewScoresButtonEl = document.getElementById("view-scores")
viewScoresButtonEl.addEventListener("click", showHighScores)
var processHighScoresEl = document.getElementById("submitInitials")
processHighScoresEl.addEventListener("click",showHighScores)
