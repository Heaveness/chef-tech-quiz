// Global variables to store the HTML elements for Javascript to use.
var timerElement = document.querySelector(".time-counter");
var startButton = document.querySelector(".start-button");
var text = document.querySelector(".quiz-text");
var container = document.querySelector("#choice-container");
var highScoreButton = document.querySelector(".view-hs-button");
var results = document.querySelector("#result-banner");

// Global variables to store the numbers for functions to store later.
var currentScore = 0;
var rightCounter = 0;
var highScore = 0;
var timer;
var timerCount;

// Global variable to create a button when a function needs it.
var button = document.createElement('button');

// Global variable to build a function around the Modal Box.
const modal = document.getElementById("myModal");
const modalButton = document.getElementById("modalButton");
const span = document.getElementsByClassName("close")[0];

// Global array variable to store the questions, choices, and answers for the quiz.
var chefQuestions = [
    {
        question: "1) What do we call the process of submerging veggies or fruits quickly in boiling water?",
        choices: {
            a: 'a) Soaking',
            b: 'b) Blanching',
            c: 'c) Shocking',
            d: 'd) Washing'
        },
        answer: 'b) Blanching'
    },
    {
        question: "2) Which dish do we have when cooking beef in puff pastry?",
        choices: {
            a: 'a) Beef Wellington',
            b: 'b) Shepherd`s Pie',
            c: 'c) Baklava',
            d: 'd) Fried Chicken'
        },
        answer: 'a) Beef Wellington'
    },
    {
        question: "3) What do we do when zesting a citrus fruit?",
        choices: {
            a: 'a) Squeeze juice',
            b: 'b) Cut the membranes',
            c: 'c) Scrape off the rind',
            d: 'd) Peeling the skin'
        },
        answer: 'c) Scrape off the rind'
    },
    {
        question: "4) Which ingredient is often added to make bread rise?",
        choices: {
            a: 'a) Milk',
            b: 'b) Water',
            c: 'c) Flour',
            d: 'd) Yeast'
        },
        answer: 'd) Yeast'
    },
    {
        question: "5) Which kind of cookware is often used for making custard or melting chocolate?",
        choices: {
            a: 'a) Double boiler',
            b: 'b) Saute pan',
            c: 'c) Pressure cooker',
            d: 'd) Sauce pan'
        },
        answer: 'a) Double boiler'
    },
];

// Function to start the sequence of functions when pressing start button.
function startQuiz(event) {
    // Sets the countdown timer to 60 seconds.
    timerCount = 60;

    // Sets what function to run first when quiz begins.
    event.preventDefault();
    startTimer();
    changeQuestion();
}

// Function for when the player gets the wrong answer.
function wrongAnswer() {
    // Deducts 10 seconds off the current timer if it's the wrong answer.
    if (timerCount > 10){
        timerCount -= 10;
        timerElement.textContent = timerCount;
        document.getElementById("result-banner").style.color = "red";
        results.innerText = "❌ Wrong Answer! ❌"
    }
    // If the timer is 10 seconds or below, any wrong answer will cause you to fail and end the game.
    else if (timerCount <= 10) {
        timerCount = 0;
        timerElement.textContent = timerCount;
        clearInterval(timer);
        // Shows the results.
        document.getElementById('quiz-text').style.display = 'none';
        document.getElementById("result-banner").style.color = "red";
        results.innerText = "💣 Wrong Answer & Time's Up! 💣"
        endResult();
    }
}

// Function for when the player gets the right answer.
function rightAnswer() {
    rightCounter++;
    document.getElementById("result-banner").style.color = "green";
    results.innerText = "✔ Right Answer! ✔"
}

// Function to start the countdown timer.
function startTimer() {
    // A countdown timer -1sec, prevents going below 0.
    timer = setInterval(function() {
        this.timerCount = Math.max(0, this.timerCount - 1);;
        timerElement.textContent = timerCount; // Displays the current timer.

        // If the countdown reaches 0 then the timer stops and ends the quiz.
        if (timerCount === 0) {
            clearInterval(timer);
            timerElement.textContent = timerCount;

            // Shows the Time's up on the result banner below the choices.
            document.getElementById('quiz-text').style.display = 'none';
            document.getElementById("result-banner").style.color = "red";
            results.innerText = "💣 Time's Up! 💣"

            // Deletes the buttons when time is up.
            document.getElementById('buttonOne').style.display = 'none';
            document.getElementById('buttonTwo').style.display = 'none';
            document.getElementById('buttonThree').style.display = 'none';
            document.getElementById('buttonFour').style.display = 'none';
            endResult();
        } 
    }, 1000); //tick interval.
}

// Function to start the first question.
function changeQuestion() {
    // Starts the question in the first object in the array and injects it to quiz-text HTML class.
    const item = document.getElementById("quiz-text");
    item.innerText = chefQuestions[0].question;
    startButton.style.display = "none"; // Hides the start button.
    
    // Starts the choice button creation.
    createButtons(0);
 }

// Function to update the question after the choice buttons are clicked.
function updateQuestion(num) {
    // If the array reaches a specific index limit it will stop the timer and move onto the result screen.
    if (chefQuestions.length <= num) {
        clearInterval(timer);
        currentScore = rightCounter;

        // Injecting text within quiz text HTML element to show score results to player.
        var y = document.getElementById("quiz-text");
        y.innerText = "📋Total score: " + currentScore + " / 5" + "\n ⏲Remaining time: " + timerCount + "s." + "\n Enter your name below to save your score!";
        y.style.fontWeight = 'bold';

        // Removes the border top to prevent formatting issues. 
        document.getElementById("result-banner").style.borderTop = "none";

        // An input box to type a user name to log their score.
        var x = document.createElement("input");
        x.setAttribute("type", "text");
        x.setAttribute("maxlength", 10);
        x.placeholder = "Enter name here... (max: 10 letters)"

        // An event listener when ENTER key is pressed on the input form box to add into Local Storage to be called into the Score Board.
        x.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                if (localStorage.getItem("Score") === null) {
                    localStorage.setItem("Score", `🍳 Chef: ${document.getElementsByTagName("input")[0].value} | 📋 Score: ${currentScore} | ⏲ Timer: ${timerCount}`);
                }
                // To combine the string of user names and scores into the local storage to prevent replacing old user issues. 
                else {
                    var local = localStorage.getItem("Score");
                    var final = local.concat("\n", `🍳 Chef: ${document.getElementsByTagName("input")[0].value} | 📋 Score: ${currentScore} | ⏲ Timer: ${timerCount}`);
                    localStorage.setItem("Score", final);
                }
                document.getElementById("result-banner").style.display = "none";
                document.getElementById("quiz-text").style.borderBottom = "none";
                return endResult();
            }
        }
    )
    // Appends the buttons to a specific element within HTML.
    document.body.appendChild(x);
    document.getElementById("quiz-text").appendChild(x)  
    } 

    // Else for the question to update to the next.
    else {
        const item = document.getElementById("quiz-text");
        item.innerText = chefQuestions[num].question;
    }
}

// Function for the end results to restart to game.
function endResult() {
    // Injecting new text within the quiz text HTML element.
    var y = document.getElementById("quiz-text");
    y.innerText = `Thank you for playing! \n Check the "💯View Score Board!" button anytime!`;
    y.style.fontWeight = 'bold';

    // Adding a reset quiz button.
    const resetButton = document.createElement('button');
    resetButton.innerText = "Play Again?";
    resetButton.setAttribute("id", "resetButton");
    document.getElementById("reset").appendChild(resetButton);
    resetButton.addEventListener("click", goHome); // Calls goHome() function at the bottom.

    // Removing the borders in the end result screen.
    document.getElementById("result-banner").style.borderTop = "none";
    document.getElementById("reset-banner").style.borderTop = "dashed";

    // Injecting new text within the reset banner HTML element.
    var z = document.getElementById("reset-banner");
    document.getElementById("reset-banner").style.color = "white";
    z.innerText = "⬇ Not satisfied? Want to try again? ⬇";
}

// Function to create a set of 4 buttons with each new given questions. 
function createButtons(question) {
    // If the parameter equals 5 return back to the function.
    if (question === 5 ) {
        return;
    }
    // If the timer reaches 0 and the questions array doesn't go past 5.
    if (chefQuestions.length <= question || timerCount === 0) {
        return question;
    }

    // First button for choice a).
    const buttonOne = document.createElement('button');
    buttonOne.setAttribute("id", "buttonOne");
    buttonOne.innerText = chefQuestions[question].choices.a;
  
    // Second button for choice b).
    const buttonTwo = document.createElement('button');
    buttonTwo.setAttribute("id", "buttonTwo");
    buttonTwo.innerText = chefQuestions[question].choices.b;

    // Third button for choice c).
    const buttonThree = document.createElement('button');
    buttonThree.setAttribute("id", "buttonThree");
    buttonThree.innerText = chefQuestions[question].choices.c;

    // Fourth button for choice d).
    const buttonFour = document.createElement('button');
    buttonFour.setAttribute("id", "buttonFour");
    buttonFour.innerText = chefQuestions[question].choices.d;

    // Appends the buttons to show up at a specific HTML element.
    document.body.appendChild(buttonOne);
    document.getElementById("choice-container").appendChild(buttonOne);
    document.body.appendChild(buttonTwo);
    document.getElementById("choice-container").appendChild(buttonTwo);
    document.body.appendChild(buttonThree);
    document.getElementById("choice-container").appendChild(buttonThree);
    document.body.appendChild(buttonFour);
    document.getElementById("choice-container").appendChild(buttonFour);
  
    // A button to check if the clicked a) button is right or wrong answer.
    buttonOne.addEventListener("click", () => {
        if (chefQuestions[question].choices.a === chefQuestions[question].answer) {
            // If the user gets the right answer then progress.
            rightAnswer()
            buttonOne.remove();
            buttonTwo.remove();
            buttonThree.remove();
            buttonFour.remove();
            createButtons(question = question + 1); // Adds a number into the array to move on.
            updateQuestion(question); // Utilize the parameter to update the question function as well.
        }
        else {
            // If the user gets the wrong answer then it says incorrect then moves on.
            wrongAnswer()
            buttonOne.remove();
            buttonTwo.remove();
            buttonThree.remove();
            buttonFour.remove();
            createButtons(question = question + 1); // Adds a number into the array to move on.
            updateQuestion(question); // Utilize the parameter to update the question function as well.
        }
    }
);
  
    // A button to check if the clicked b) button is right or wrong answer.
    buttonTwo.addEventListener("click", () => {
        if (chefQuestions[question].choices.b === chefQuestions[question].answer) {
            // If the user gets the right answer then progress.
            rightAnswer()
            buttonOne.remove();
            buttonTwo.remove();
            buttonThree.remove();
            buttonFour.remove();
            createButtons(question = question + 1); // Adds a number into the array to move on.
            updateQuestion(question); // Utilize the parameter to update the question function as well.
        } 
        else {
            // If the user gets the wrong answer then it says incorrect then moves on.
            wrongAnswer()
            buttonOne.remove();
            buttonTwo.remove();
            buttonThree.remove();
            buttonFour.remove();
            createButtons(question = question + 1); // Adds a number into the array to move on.
            updateQuestion(question); // Utilize the parameter to update the question function as well.
        }
    }
);

    // A button to check if the clicked c) button is right or wrong answer.
    buttonThree.addEventListener("click", () => {
        if (chefQuestions[question].choices.c === chefQuestions[question].answer) {
            // If the user gets the right answer then progress.
            rightAnswer()
            buttonOne.remove();
            buttonTwo.remove();
            buttonThree.remove();
            buttonFour.remove();
            createButtons(question = question + 1); // Adds a number into the array to move on.
            updateQuestion(question); // Utilize the parameter to update the question function as well.
        }
        else {
            // If the user gets the wrong answer then it says incorrect then moves on.
            wrongAnswer()
            buttonOne.remove();
            buttonTwo.remove();
            buttonThree.remove();
            buttonFour.remove();
            createButtons(question = question + 1); // Adds a number into the array to move on.
            updateQuestion(question); // Utilize the parameter to update the question function as well.
        }
    }
);

    // A button to check if the clicked d) button is right or wrong answer.
    buttonFour.addEventListener("click", () => {
        if (chefQuestions[question].choices.d === chefQuestions[question].answer) {
            // If the user gets the right answer then progress.
            rightAnswer()
            buttonOne.remove();
            buttonTwo.remove();
            buttonThree.remove();
            buttonFour.remove();
            createButtons(question = question + 1); // Adds a number into the array to move on.
            updateQuestion(question);
        }
        else {
            // If the user gets the wrong answer then it says incorrect then moves on.
            wrongAnswer()
            buttonOne.remove();
            buttonTwo.remove();
            buttonThree.remove();
            buttonFour.remove();
            createButtons(question = question + 1); // Adds a number into the array to move on.
            updateQuestion(question);
        }
    }
);
}

// Function for the game reset button to go back to homepage.
function goHome() {
    window.location.href="";
}

// On click function for the Modal Box to pop up.
modalButton.onclick = function() {
    modal.style.display = "block";
    document.getElementById("modalText").innerText = localStorage.getItem("Score");
}

// On click function for closing the Modal Box.
span.onclick = function() {
    modal.style.display = "none";
}

// On click function for displaying the Modal Box.
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Global Variable to clear high scores.
var clear = document.getElementById("clear-hs");

// On click function to clear the high score when button is clicked.
clear.onclick = function() {
    localStorage.clear();
    document.getElementById('modalText').innerHTML = "";
}

// Event listener for the start button to begin the quiz.
startButton.addEventListener("click", startQuiz);