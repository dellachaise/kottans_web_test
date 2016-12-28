var app = {
	//Elements to input data
	layoutBordBlock: $(".layoutBord"),
	lettersArea: $("#lettersBlock"),
	addLettersArea: $("#inputBlock"),
	correctMarkArea: $("#corectMark"),
	buttonsLettersArea: [],
	buttonsInputArea: [],
	userAnswer: [],
	//counters
	counterCorrectAnswers: 0,
	counterTotalQuestion: 0
};

window.onload = function () {
	app.get_date();
	$("#answersScore p").text("Correct Answers: " + app.counterCorrectAnswers);
	$("#questionsScore p").text("Total Questions: " + app.counterTotalQuestion);
};
//Ajax Request
app.get_date = function getQuestion() {
    var	resp,
    	answer,
    	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            resp = JSON.parse(xhr.responseText);
            answer = resp[0].answer;
            //set data
            $("#question").text(resp[0].question);
            $("#questionId").text('Question #' + resp[0].id);
            $("#category").text("Category: " + resp[0].category.title);
            console.log(answer);
            //set letters
            app.set_letters(answer);
        }
    }
    xhr.open("GET", "http://jservice.io/api/random", true);
    xhr.send();
}

//Mix letters
Array.prototype.shuffle = function() {
    for (var i = this.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
}

app.set_letters = function (data) {
	var length = data.length,
		lettersArray = [],
		lettersArrayMixed;
	app.answer = data;
	for(var i = 0; i < length; i += 1) {
		lettersArray.push(data[i]);
	}
	do {lettersArrayMixed = lettersArray.shuffle();}
	while(lettersArrayMixed.join("") === data);
	for(var i = 0; i < length; i += 1) {
		app.lettersArea.append('<button>' + lettersArray[i] + '</button>');
	}
}

//interact with letters part1 - allLettersBlock
app.lettersAreaEvent = function(event) {
	var letter = $(event.target).text();
	app.addLettersArea.append('<button>' + letter + '</button>');
	event.target.remove();
	app.userAnswer.push(letter);
	app.change_view();
}

$("body").on('click', "#lettersBlock button", app.lettersAreaEvent);

// interact with letters	- part2 answerLettersBlock
app.inputAreaEvent = function(event) {
	var pressedButton = $(event.target),
		letter = pressedButton.text();
	app.lettersArea.append('<button>' + letter + '</button>');
	pressedButton.remove();
	for(var i = 0, length = app.userAnswer.length; i < length; i += 1) {
		if(letter === app.userAnswer[i]) {
			app.userAnswer.splice(i, 1);
			break;
		}
	}
	app.change_view();
}
$("body").on('click', "#inputBlock button", app.inputAreaEvent);

//change view
app.change_view = function () {
	if(app.answer.length === app.userAnswer.length) {
		if(app.answer === app.userAnswer.join("")) {
			app.layoutBordBlock.addClass('correct');
			app.correctMarkArea.append('<p>&#10004;Correct</p>');
		} else  if (app.answer === app.userAnswer.join("") && app.layoutBordBlock.hasClass('incorrect')) {
			app.layoutBordBlock.removeClass('incorrect');
			app.correctMarkArea.text("");
		} else if(app.answer !== app.userAnswer.join("")) {
			app.layoutBordBlock.addClass('incorrect');
			app.correctMarkArea.append('<p>&#10008; Incorrect</p>');
		}
	} else if (app.answer.length !== app.userAnswer.length && (app.layoutBordBlock.hasClass('correct') 
		|| app.layoutBordBlock.hasClass('incorrect'))) {
		app.layoutBordBlock.removeClass('correct');
		app.layoutBordBlock.removeClass('incorrect');
		app.correctMarkArea.text("");
	}
}

//change score counters
app.commonForCounters = function () {
	app.counterTotalQuestion += 1;
	$("#answersScore p").text("Correct Answers: " + app.counterCorrectAnswers);
	$("#questionsScore p").text("Total Questions: " + app.counterTotalQuestion);
	app.addLettersArea.empty();
	app.get_date();
	app.userAnswer = [];
	app.layoutBordBlock.removeClass('correct');
	app.correctMarkArea.text("");
}
app.nextQuestionEvent = function () {
	app.counterCorrectAnswers += 1;
	app.layoutBordBlock.removeClass('correct');
	app.commonForCounters();
}
$("#nextQuestion").on("click", app.nextQuestionEvent);

//press SKIP button
app.skipEvent = function () {
	app.lettersArea.empty();
	app.commonForCounters();
	app.layoutBordBlock.removeClass('incorrect');
}
$("#skipButton").on("click", app.skipEvent);

