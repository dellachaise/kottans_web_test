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
	userAnswer: []
};
	
app.get_date = function () {
	return {
		"id": 312,
		"answer": "six",
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

//Fill html with data
app.set_date = function () {
	app.get_date_obj();
	app.questionIdArea.text('Question #'+ app.id);
	app.categoryArea.text('Category:' + " " + app.category);
	app.questionArea.text(app.question);
	console.log(app.answer);
	app.set_letters();
}

window.onload = function () {
	app.set_date();
	app.buttonsLettersArea = $("#lettersBlock button");
	var fun1 = function(event) {	
		app.addLettersArea.append(event.target);
		console.log(event.target);
		app.buttonsInputArea = $("#inputBlock button");
		console.log(app.buttonsLettersArea);
	}
	var fun2 = function(e) {
		app.lettersArea.append(e.target);
		console.log(event.target);
	}
	$("#lettersBlock button").on('click', fun1);

	$("#inputBlock button").on('click', fun2);

	//interact with letters
	// app.buttonsLettersArea.click(function(event) {
	// 	app.addLettersArea.append(event.target);
	// 	// app.buttonsInputArea = $("#inputBlock button");
	// 	// console.log(app.buttonsInputArea);
	// 	app.userAnswer.push($(event.target).text());
	// 	console.log(app.userAnswer);
	// 	if(app.userAnswer.length === app.answer.length && app.userAnswer.join("") === app.answer) {
	// 		app.layoutBordBlock.addClass('correct');
	// 		app.correctMarkArea.append('<p>&#10004;Correct</p>');
	// 	} else if (app.userAnswer.length === app.answer.length && app.userAnswer.join("") !== app.answer){
	// 		// console.log(1);
	// 		app.layoutBordBlock.removeClass('correct')
	// 		app.layoutBordBlock.addClass('incorrect');
	// 		app.correctMarkArea.append('<p>&#10008; Incorrect</p>');
	// 	}
	// });
	// app.buttonsInputArea = $("#inputBlock button");
	// app.buttonsInputArea.click(function(event) {
	// 	console.log(app.buttonsInputArea);
	// 	var letter = $(event.target).text();
	// 	console.log(app.userAnswer);
	// 	app.lettersArea.append(event.target);
	// 	for(var i = 0, length = app.userAnswer.length; i < length; i += 1) {
	// 		if(app.userAnswer[i] === letter) {
	// 			console.log(1);
	// 			app.userAnswer.splice(i, 1);
	// 			console.log(app.userAnswer);
	// 		}
	// 	}
	// });
};
	
