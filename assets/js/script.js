var timerElement = document.querySelector(".time-counter");
var startButton = document.querySelector(".start-button");
var text = document.querySelector(".quiz-text");
var container = document.querySelector("#choice-container");
var highScoreButton = document.querySelector(".view-hs-button");
var results = document.querySelector("#result-banner");

var currentScore = 0;
var rightCounter = 0;
var wrongCounter = 0;
var highScore = 0;
var timer;
var timerCount;

var highScoreArray = [];

var countNum = 0;

var button = document.createElement('button');

const modal = document.getElementById("myModal");
const modalButton = document.getElementById("modalButton");
const span = document.getElementsByClassName("close")[0];

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

function startQuiz(sq) {
  timerCount = 60;

  sq.preventDefault();
  startTimer();
}

function wrongAnswer() {
  if (timerCount > 10){
    timerCount -= 10;
    timerElement.textContent = timerCount;
    wrongCounter++;
    document.getElementById("result-banner").style.color = "red";
    results.innerText = "❌ Wrong Answer! ❌"
  } else if (timerCount <= 10) {
    timerCount = 0;
    timerElement.textContent = timerCount;
    clearInterval(timer);
    document.getElementById("result-banner").style.color = "red";
    results.innerText = "💣Time's up!💣"
    document.getElementById('buttonOne').style.display = 'none';
    document.getElementById('buttonTwo').style.display = 'none';
    document.getElementById('buttonThree').style.display = 'none';
    document.getElementById('buttonFour').style.display = 'none';
    updateQuestion(5);
  }
}

function rightAnswer() {
  rightCounter++;
  document.getElementById("result-banner").style.color = "green";
  results.innerText = "✔ Right Answer! ✔"
}

function startTimer() {
  function changeQuestion() {
      const item = document.getElementById("quiz-text");
      item.innerText = chefQuestions[0].question;
      startButton.style.display = "none";
    
      createButtons(0);
  }
  changeQuestion();
  timer = setInterval(function() {
    timerCount -= 1;
    timerElement.textContent = timerCount;
    if (timerCount === 0) {
      wrongAnswer();
    } 
  }, 1000);
}

function updateQuestion(num) {
  if (chefQuestions.length <= num) {
    clearInterval(timer);
    currentScore = rightCounter;

    var y = document.getElementById("quiz-text");
    y.innerText = "📋Total score: " + currentScore + " / 5" + "\n ⏲Remaining time: " + timerCount + "s." + "\n Enter your name below to save your score!";
    y.style.fontWeight = 'bold';

    document.getElementById("result-banner").style.borderTop = "none";

    var x = document.createElement("input");
    x.setAttribute("type", "text");
    x.setAttribute("maxlength", 10);
    x.placeholder = "Enter name here... (max: 10 letters)"

    x.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (localStorage.getItem("Score") === null) {
          localStorage.setItem("Score", `🍳 Chef: ${document.getElementsByTagName("input")[0].value} | 📋 Score: ${currentScore} | ⏲ Timer: ${timerCount}`);
        } else {
          var local = localStorage.getItem("Score");
          var final = local.concat("\n", `🍳 Chef: ${document.getElementsByTagName("input")[0].value} | 📋 Score: ${currentScore} | ⏲ Timer: ${timerCount}`);
          localStorage.setItem("Score", final);
        }
        return endResult();
      }
    }
    )
    document.body.appendChild(x);
    document.getElementById("quiz-text").appendChild(x)
    
  } else {
    const item = document.getElementById("quiz-text");
    item.innerText = chefQuestions[num].question;
  }
}

function endResult() {
  var y = document.getElementById("quiz-text");
  y.innerText = `Thank you for playing!" + "\n You can check your score through the "💯View Score Board!" button anytime!`;
  y.style.fontWeight = 'bold';

  const resetButton = document.createElement('button');
  resetButton.innerText = "Play Again?";
  resetButton.setAttribute("id", "resetButton");
  document.getElementById("reset").appendChild(resetButton);
  resetButton.addEventListener("click", goHome);

  var z = document.getElementById("result-banner");
  document.getElementById("result-banner").style.color = "white";
  z.innerText = "⬇ Not satisfied? Want to try again? ⬇";
}

//creates a set of 4 buttons with given questions 
function createButtons(question) {
if (question === 5 ) {
  return;
}
  if (chefQuestions.length <= question || timerCount === 0) {
    return question;
  }

  const buttonOne = document.createElement('button');
  buttonOne.setAttribute("id", "buttonOne");
  buttonOne.innerText = chefQuestions[question].choices.a;
  
  const buttonTwo = document.createElement('button');
  buttonTwo.setAttribute("id", "buttonTwo");
  buttonTwo.innerText = chefQuestions[question].choices.b;

  const buttonThree = document.createElement('button');
  buttonThree.setAttribute("id", "buttonThree");
  buttonThree.innerText = chefQuestions[question].choices.c;

  const buttonFour = document.createElement('button');
  buttonFour.setAttribute("id", "buttonFour");
  buttonFour.innerText = chefQuestions[question].choices.d;

  document.body.appendChild(buttonOne);
  document.getElementById("choice-container").appendChild(buttonOne);
  document.body.appendChild(buttonTwo);
  document.getElementById("choice-container").appendChild(buttonTwo);
  document.body.appendChild(buttonThree);
  document.getElementById("choice-container").appendChild(buttonThree);
  document.body.appendChild(buttonFour);
  document.getElementById("choice-container").appendChild(buttonFour);
  
  buttonOne.addEventListener("click", () => {
      if (chefQuestions[question].choices.a === chefQuestions[question].answer) {
        //progress
        rightAnswer()
        buttonOne.remove();
        buttonTwo.remove();
        buttonThree.remove();
        buttonFour.remove();
        createButtons(question = question + 1);
        updateQuestion(question);
      } else {
        //say incorrect
        wrongAnswer()
        createButtons(question = question + 1);
        buttonOne.remove();
        buttonTwo.remove();
        buttonThree.remove();
        buttonFour.remove();
        updateQuestion(question);
      }
    }
  );
  
  buttonTwo.addEventListener("click", () => {
      if (chefQuestions[question].choices.b === chefQuestions[question].answer) {
        //progress
        rightAnswer()
        buttonOne.remove();
        buttonTwo.remove();
        buttonThree.remove();
        buttonFour.remove();
        createButtons(question = question + 1);
        updateQuestion(question);
      } else {
        //say incorrect
        wrongAnswer()
        buttonOne.remove();
        buttonTwo.remove();
        buttonThree.remove();
        buttonFour.remove();
        createButtons(question = question + 1);
        updateQuestion(question);
      }
    }
  );

  buttonThree.addEventListener("click", () => {
      if (chefQuestions[question].choices.c === chefQuestions[question].answer) {
        //progress
        rightAnswer()
        buttonOne.remove();
        buttonTwo.remove();
        buttonThree.remove();
        buttonFour.remove();
        createButtons(question = question + 1);
        updateQuestion(question);
      } else {
        //say incorrect
        wrongAnswer()
        buttonOne.remove();
        buttonTwo.remove();
        buttonThree.remove();
        buttonFour.remove();
        createButtons(question = question + 1);
        updateQuestion(question);
      }
    }
  );

  buttonFour.addEventListener("click", () => {
      if (chefQuestions[question].choices.d === chefQuestions[question].answer) {
        //progress
        rightAnswer()
        buttonOne.remove();
        buttonTwo.remove();
        buttonThree.remove();
        buttonFour.remove();
        createButtons(question = question + 1);
        updateQuestion(question);
      } else {
        //say incorrect
        wrongAnswer()
        buttonOne.remove();
        buttonTwo.remove();
        buttonThree.remove();
        buttonFour.remove();
        createButtons(question = question + 1);
        updateQuestion(question);
      }
    }
  );
}

function goHome() {
  window.location.href="";
}

modalButton.onclick = function() {
  modal.style.display = "block";
  document.getElementById("modalText").innerText = localStorage.getItem("Score");
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var clear = document.getElementById("clear-hs");

clear.onclick = function() {
  localStorage.clear();
  document.getElementById('modalText').innerHTML = "";
}
startButton.addEventListener("click", startQuiz);