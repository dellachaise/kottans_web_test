var app = {
	data: "",
	//data from Ajax
	id: "",
	answer: "",
	question: "",
	category: "",
	//Elements to input data
	questionIdArea: $("#questionId"),
	categoryArea: $("#category"),
	questionArea: $("#question"),
	layoutBordBlock: $(".layoutBord"),
	lettersArea: $("#lettersBlock"),
	addLettersArea: $("#inputBlock"),
	buttonsLettersArea: [],
	buttonsInputArea: [],
	correctMarkArea: $("#corectMark"),
	buttonNext: $("#nextQuestion"),
	userAnswer: [],
	//counters
	counterCorrectAnswers: 0,
	counterTotalQuestion: 0
};

window.onload = function () {
	app.set_date();

	//interact with letters part1 - allLettersBlock
	app.lettersAreaEvent = function(event) {
		var letter = $(event.target).text();
		app.addLettersArea.append('<button>' + letter + '</button>');
		event.target.remove();
		app.userAnswer.push(letter);

		//change view
		if(app.answer.length === app.userAnswer.length) {
			if(app.answer === app.userAnswer.join("")) {
				app.layoutBordBlock.addClass('correct');
				app.correctMarkArea.append('<p>&#10004;Correct</p>');
				$("body").off('click', "#inputBlock button", app.inputAreaEvent);
			} else {
				app.layoutBordBlock.removeClass('correct');
				app.layoutBordBlock.addClass('incorrect');
				app.correctMarkArea.append('<p>&#10008; Incorrect</p>');
			}
		}
	}

	$("body").on('click', "#lettersBlock button", app.lettersAreaEvent);
};
	
app.get_date = function () {
	return {
		"id": 312,
		"answer": "twenty",
		"question": "How old are you?",
		"category": "you"
	}
}

app.get_date_obj = function () {
	data = app.get_date();
	app.id = data["id"];
	app.answer = data["answer"];
	app.question = data["question"];
	app.category = data["category"];
} 

//Fill html with data
app.set_date = function () {
	app.get_date_obj();
	app.questionIdArea.text('Question #'+ app.id);
	app.categoryArea.text('Category:' + " " + app.category);
	app.questionArea.text(app.question);
	console.log(app.answer);
	app.set_letters();
	$("#answersScore p").text("Correct Answers: " + app.counterCorrectAnswers);
	$("#questionsScore p").text("Total Questions: " + app.counterTotalQuestion);
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

app.set_letters = function () {
	var length = app.answer.length,
		lettersArray = [],
		lettersArrayMixed;
	for(var i = 0; i < length; i += 1) {
		lettersArray.push(app.answer[i]);
	}
	do {lettersArrayMixed = lettersArray.shuffle();}
	while(lettersArrayMixed.join("") === app.answer);
	for(var i = 0; i < length; i += 1) {
		app.lettersArea.append('<button>' + lettersArray[i] + '</button>');
	}
}

//interact with letters	- part2 answerLettersBlock
app.inputAreaEvent = function(e) {
	var letter = $(e.target).text();
	app.lettersArea.append('<button>' + letter + '</button>');
	e.target.remove();
	for(var i = 0, length = app.userAnswer.length; i < length; i += 1) {
		if(letter === app.userAnswer[i]) {
			app.userAnswer.splice(i, 1);
			console.log($("#inputBlock"));
			break;
		}
	}
	if(app.answer.length !== app.userAnswer.length && (app.layoutBordBlock.hasClass('correct') 
		|| app.layoutBordBlock.hasClass('incorrect'))) {
		app.layoutBordBlock.removeClass('correct');
		app.layoutBordBlock.removeClass('incorrect');
		app.correctMarkArea.text("");
	}
}
$("body").on('click', "#inputBlock button", app.inputAreaEvent);

//change score counters
app.commonForCounters = function () {
	app.counterTotalQuestion += 1;
	$("#answersScore p").text("Correct Answers: " + app.counterCorrectAnswers);
	$("#questionsScore p").text("Total Questions: " + app.counterTotalQuestion);
	app.addLettersArea.empty();
	app.get_date();
	app.set_date();
	app.userAnswer = [];
	app.layoutBordBlock.removeClass('correct');
	$("body").on('click', "#inputBlock button", app.inputAreaEvent);
	app.correctMarkArea.text("");
}
app.nextQuestionEvent = function () {
	app.commonForCounters();
	app.counterCorrectAnswers += 1;
	app.layoutBordBlock.removeClass('correct');
}
$("#nextQuestion").on("click", app.nextQuestionEvent);

//press SKIP button
app.skipEvent = function () {
	app.lettersArea.empty();
	app.commonForCounters();
	app.layoutBordBlock.removeClass('incorrect');
}
$("#skipButton").on("click", app.skipEvent);
