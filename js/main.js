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
	app.getData();
	$("#answersScore p").text("Correct Answers: " + app.counterCorrectAnswers);
	$("#questionsScore p").text("Total Questions: " + app.counterTotalQuestion);
	$("body").on('click', "#lettersBlock button", app.lettersAreaEvent);
	$("body").on('click', "#inputBlock button", app.inputAreaEvent);
	$("#nextQuestion").on("click", app.nextQuestionEvent);
	$("#skipButton").on("click", app.skipEvent);
};
//Ajax Request
app.getData = function getQuestion() {
    var	resp,
    	answer;

    $.getJSON("http://jservice.io/api/random", function(resp) {
        answer = resp[0].answer;
        //set data
        $("#question").text(resp[0].question);
        $("#questionId").text('Question #' + resp[0].id);
        $("#category").text("Category: " + resp[0].category.title);
        console.log(answer);
        //set letters
        app.setLetters(answer);
    })
}

//Mix letters
Array.prototype.shuffle = function() {
	var num, d;

    for (var i = this.length - 1; i > 0; i--) {
        num = Math.floor(Math.random() * (i + 1));
        d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
}

app.setLetters = function (data) {
	var length = data.length,
		lettersArray = data.split('');
	app.answer = data;

	do {
		lettersArray.shuffle();
	}
	while(length > 1 && lettersArray.join("") === data);

	for(var i = 0; i < length; i += 1) {
		app.addLetterInputArea(lettersArray[i]);
	}
}

//interact with letters
app.addLetterLettersArea = function(letter) {
	app.addLettersArea.append('<button>' + letter + '</button>');
}

app.addLetterInputArea = function(letter) {
	app.lettersArea.append('<button>' + letter + '</button>');
}

app.lettersAreaEvent = function(event) {
	var letter = $(event.target).text();
	app.addLetterLettersArea(letter);
	event.target.remove();
	app.userAnswer.push(letter);
	app.changeView();
}

app.inputAreaEvent = function(event) {
	var pressedButton = $(event.target),
		letter = pressedButton.text();
	app.addLetterInputArea(letter);
	pressedButton.remove();

	for(var i = 0, length = app.userAnswer.length; i < length; i += 1) {
		if(letter === app.userAnswer[i]) {
			app.userAnswer.splice(i, 1);
			break;
		}
	}
	app.changeView();
}


//change view
app.changeView = function () {
	if(app.answer.length === app.userAnswer.length) {
		if(app.answer === app.userAnswer.join("")) {
			app.layoutBordBlock.addClass('correct');
		} else {
			app.layoutBordBlock.addClass('incorrect');
		}
	} else {
		app.layoutBordBlock.removeClass('correct');
		app.layoutBordBlock.removeClass('incorrect');
	}
}

//change score counters
app.commonForCounters = function () {
	app.counterTotalQuestion += 1;
	$("#answersScore p").text("Correct Answers: " + app.counterCorrectAnswers);
	$("#questionsScore p").text("Total Questions: " + app.counterTotalQuestion);
	app.addLettersArea.empty();
	app.getData();
	app.userAnswer = [];
	app.layoutBordBlock.removeClass('correct');
}
//press NEXT button
app.nextQuestionEvent = function () {
	app.counterCorrectAnswers += 1;
	app.layoutBordBlock.removeClass('correct');
	app.commonForCounters();
}

//press SKIP button
app.skipEvent = function () {
	app.lettersArea.empty();
	app.commonForCounters();
	app.layoutBordBlock.removeClass('incorrect');
}
