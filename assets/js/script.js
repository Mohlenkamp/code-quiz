// Set Globals
var timer = 75;

//Create questions for the quiz
var questionDeck = [
    {   "questionID": "0",
        "questionType": "ok",
        "numberChoices": "1",
        "questionText": "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score and reduce your time limit by 10 seconds.",
        "answerRight": "Ready to Start!"
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
    }
]   

var getRandomNumber = function (x, y){
        x = Math.ceil(x);
        max = Math.floor(y);
        return Math.floor(Math.random() * (y - x + 1)) + x;
    }

// Function to setup how the beginning screen looks
function startingScreen(){

    var questionTitle = document.createElement("h1");
    questionTitle.className = "question";
    questionTitle.textContent = "Coding Quiz Challenge"  
}