
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
         	ALERT_TITLE = "Hooray! You're correct!";
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
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "/6" + "</h2>" + "<a href='https://www.milesccoleman.com/misinformationethicsquiz/'>Restart Quiz</a>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Increases in respiratory syncytial virus in children are linked to the COVID-19 vaccine.", ["It's true", "It's misinformation"], "It's misinformation", "There is no evidence COVID-19 vaccination causes RSV in children, according to the Centers for Disease Control and Prevention. The agency said a recent increase in cases of respiratory syncytial virus is likely because of a relaxation of widespread mitigation measures. <br><br>There is no COVID-19 vaccine authorized for children younger than 6 months old, and that age group continues to have the highest rates of RSV hospitalization, according to the CDC. <p style='color: blue'>Even though this claim is squarely false, one might still find it on a platform like Reddit, where freedom of speech is valued (even when it might be accompanied by threat of harm).</p><a target='_blank' href='https://www.politifact.com/factchecks/2022/nov/21/instagram-posts/no-covid-19-vaccination-not-causing-rsv-children/'>Read more</a>"),
    new Question("The number of COVID-19 deaths recorded so far in 2021 has surpassed the total for 2020.", ["It's true", "It's misinformation"], "It's true", "Both Johns Hopkins Coronavirus Resource Center data and CDC mortality death certificate data indicate there were more deaths in 2021 than in 2020.<p style='color: blue'>Although this claim is one that is easily verifiable, it nonetheless runs the risk of being automatically removed on a platform like YouTube, which uses automation and strict definitions of non-misinformation unilaterally.</p><a target='_blank' href='https://www.politifact.com/factchecks/2022/jan/18/roger-williams/williams-accurate-there-were-more-covid-19-deaths-/'>Read more</a>"),    
    new Question("'Peer-reviewed paper' shows 'Fauci created COVID-19.'", ["It's true", "It's misinformation"], "It's misinformation", "A preprint paper posted Oct. 20 suggested that SARS-CoV-2 was synthetic, not naturally occurring.<br><br>The study has not been peer-reviewed, but has been criticized by many in the scientific community since it was posted on a free website that invites publication of non-peer-reviewed papers.<br><br>The study does not mention Dr. Anthony Fauci, the director of the National Institute of Allergy and and Infectious Diseases and chief medical adviser to President Joe Biden.<p style='color: blue'>The status of this paper as a 'scientific' one is disputed. On a platform like Twitter, the claim would not be removed for citing faulty sources, but rather for making a factual claim. Twitter's policies for misinformation, while absolutely focused on the removal of false facts, also protect personal opinions. As such, if someone wanted to, they could simply reword the claim to say, 'I believe this is evidence that...' to keep the post up. </p><a target='_blank' href='https://www.politifact.com/factchecks/2022/oct/27/instagram-posts/dr-fauci-did-not-create-covid-19-thats-pants-on-fi/'>Read more</a>"),
    new Question("'We know mask mandates work. There’s enough evidence out there between counties that have done it and counties that haven’t.'", ["It's true", "It's misinformation"], "It's true", "Multiple studies have suggested mask mandates can lead to a decline in COVID-19 cases. <br><br>Researchers caution that factors like compliance and enforcement should be taken into consideration, but masks have ultimately proven to be an effective tool in combating the virus.<p style='color: blue'>On Twitter or Reddit, this post certainly wouldn't be removed (for it is true). However, the platforms also would not reprimand, or directly quell, the negative backlash of other users who use name-calling, threats, or other unproductive argument tactics to attack a person who is posting factual information (but which is interpreted as 'political.').</p><a target='_blank' href='https://www.politifact.com/factchecks/2021/feb/12/gordon-hintz/wisconsin-assembly-minority-leader-right-relations/'>Read more</a>"),
    new Question("Covid vaccinations are now prohibited in people under 50 in Denmark.", ["It's true", "It's misinformation"], "It's misinformation", "The COVID-19 primary vaccine series is generally still available to people younger than 50, though vaccinations have been limited among children. Starting in July, it was no longer possible for children younger than age 18 to get a first COVID-19 shot and after August, it was no longer possible for them to get a second injection. Children at high risk of becoming severely ill can still get a vaccine at their doctor’s recommendation, according to the health authority.<p style='color: blue'>While to some people, this claim might seem outlandish, to others, it might be true. Such is a realization of the tension between trusting publics to make their own decisions, and the pragmatic reality that everyone can't know everything all of the time (thus putting platforms in a predicament of deciding what to allow, or disallow in their 'feeds').</p><a target='_blank' href='https://www.politifact.com/factchecks/2022/oct/18/viral-image/denmark-is-focusing-its-covid-19-booster-campaign/'>Read more</a>"), 
	new Question("The National Institutes of Health 'adds ivermectin to list of COVID approved treatments.'", ["It's true", "It's misinformation"], "It's misinformation", "Ivermectin appears on a list of drugs being evaluated to treat COVID-19, but the National Institutes of Health isn’t recommending people use it. <p style='color: blue'>While to some people, this claim might seem outlandish, to others, it might be true. Such is a realization of the tension between trusting publics to make their own decisions, and the pragmatic reality that everyone can't know everything all of the time (thus putting platforms in a predicament of deciding what to allow, or disallow in their 'feeds').</p><a target='_blank' href='https://www.politifact.com/factchecks/2022/sep/07/instagram-posts/no-nih-doesnt-recommend-using-ivermectin-treat-cov/'>Read more</a>") 
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();
