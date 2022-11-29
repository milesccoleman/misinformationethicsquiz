
// code based on webdevtrick (https://webdevtrick.com)
function Question(text, choices, answer, explanation) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.explanation = explanation;  
    console.log(this.explanation)   
    }

var ALERT_TITLE = "INDICATION"
var ALERT_BUTTON_TEXT = "Got it";

if(document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    }
}

function createCustomAlert(txt) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.id = "header";
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    msg.id = "exp"
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() {populate(); document.body.style.backgroundColor = "white"; removeCustomAlert();return false;
}

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}

//QUIZ
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    this.correctAnswer = false; 
    this.ALERT_TITLE = ""
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        this.correctAnswer = true; 
        console.log("prototype " + this.correctAnswer)
    }
 
         if (this.correctAnswer == true) {
         	ALERT_TITLE = "Hooray! You spotted the misinformation!";
         	alert(questions[this.questionIndex].explanation)
         	var result = "<span style='color:green'>" + ALERT_TITLE + "</span>";
			document.getElementById("header").innerHTML = result;
			document.body.style.backgroundColor = "#48f542";
        	console.log("right answer " + this.correctAnswer)
        	this.questionIndex++;
        }
        
        if (this.correctAnswer == false) {
        	ALERT_TITLE = "Oh no! You fell for misinformation!";
        	alert(questions[this.questionIndex].explanation)
        	document.body.style.backgroundColor = "#f55142";
        	console.log("right answer " + this.correctAnswer)
        	this.questionIndex++;
        }
        this.correctAnswer = false; 

}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 		
         showProgress(); 
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "/6" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("A negative COVID test means you are safe.", ["It's true", "It's misinformation"], "It's misinformation", "If you get a COVID-19 test and the result is negative, that means you probably were not infected at the time your sample was collected. But if you get tested too soon after exposure to the coronavirus, it could be too early for signs of infection to show up on the test. Also, testing negative for the coronavirus now does not mean you cannot become infected in the future or that you are immune from getting COVID-19."),
    new Question("Quercetin, essential oils and other supplements can protect you from the coronavirus or treat COVID-19.", ["It's true", "It's misinformation"], "It's misinformation", "Taking quercetin, zinc, or vitamin D and other nutritional supplements cannot prevent or treat coronavirus infection or COVID-19. The same is true of essential oils — they are not effective to prevent coronavirus disease. The best ways to stay safe from COVID-19 are getting vaccinated, wearing a mask (especially in crowded or indoor settings), keeping your hands clean and practicing physical distancing."),
    new Question("Herd immunity will end the coronavirus pandemic, so vaccinations are not necessary.", ["It's true", "It's misinformation"], "It's misinformation", "Herd immunity is a term that refers to cases of an infectious disease slowing down and stopping when enough people in a population have immunity, either from getting and surviving a disease or from being vaccinated. For COVID-19, letting people get the disease would result in many people getting severely sick, suffering lasting organ damage and even dying before herd immunity could occur. Being vaccinated for COVID-19 drastically reduces your chance of having severe COVID-19 if you are exposed to SARS-CoV-2, the coronavirus that causes the disease. Immunity from the vaccine may last longer than immunity from having COVID-19. Also, vaccination reduces the number of infections that give the coronavirus an opportunity to mutate (change). Mutations (variants) of the virus (such as the contagious delta variant) can delay or even prevent herd immunity from being reached."),
    new Question("Ivermectin cures or prevents COVID-19.", ["It's true", "It's misinformation"], "It's misinformation", "Ivermectin is a medicine that controls parasites in animals and humans. Irresponsible and misleading reports are circulating in social media and elsewhere that taking the drug is a safe way to prevent or cure COVID-19. The U.S. Food and Drug Administration (FDA) has not authorized or approved the use of ivermectin to prevent or treat COVID-19. The FDA has received reports of humans taking veterinary ivermectin. The formulas for horses and other animals are different than for people and can be very toxic (poisonous) to humans. Taking ivermectin for nonapproved reasons or in large doses can be harmful, and can lead to hospitalization and even death."),
    new Question("Warm water or saline will protect you from getting sick if you’re exposed to the coronavirus.", ["It's true", "It's misinformation"], "It's misinformation", "False reports are circulating that drinking or bathing in warm or hot water, or washing out the inside of your nose with saline (salt) solution, will protect you from COVID-19 if you are exposed to the coronavirus. These reports are not true. The coronavirus that causes COVID-19 is very tiny and cannot be rinsed or washed out of the throat or nasal passages. The best ways to prevent infection are to get vaccinated, wear a mask, and practice hand hygiene and physical distancing."), 
	new Question("Children can get COVID-19.", ["It's true", "It's misinformation"], "It's true", "Children can get COVID-19. In most cases, COVID-19 seems to be milder in young children than in adults, but parents and caregivers should understand that children can be infected with the coronavirus and transmit it to others. The Centers for Disease Control and Prevention (CDC) now recommends a COVID-19 vaccine for children. Johns Hopkins Medicine encourages all families to have eligible children vaccinated with the COVID-19 vaccine. In rare cases, children infected with the coronavirus can develop a serious lung infection and become very sick with COVID-19, and deaths have occurred. That’s why it is important to follow proven COVID-19 precautions such as wearing a mask when in public, indoor places to reduce the chance of becoming infected with the coronavirus. We can help protect children who are too young to be vaccinated by ensuring that all of the eligible people around them get vaccinated.") 
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();