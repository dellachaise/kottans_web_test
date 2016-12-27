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
	lettersArea: $("#lettersBlock"),
	addLettersArea: $("#inputBlock"),
	correctMarkArea: $("#corectMark"),
	buttonNext: $("#nextQuestion"),
	userAnswer: ""
};

window.onload = function () {
	app.set_date();

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
	console.log(lettersArray);
	for(var i = 0; i < length; i += 1) {
		app.lettersArea.append('<button>' + lettersArray[i] + '</button>');
	}
}

app.set_date = function () {
	app.get_date_obj();
	app.questionIdArea.text('Question #'+ app.id);
	app.categoryArea.text('Category:' + " " + app.category);
	app.questionArea.text(app.question);
	console.log(app.answer);
	app.set_letters();
}

//interact with letters
app.lettersArea.click(function(event) {
	app.addLettersArea.append(event.target);
	app.userAnswer += $(event.target).text();
	if(app.userAnswer.length === app.answer.length) {
		if(app.userAnswer === app.answer) {
			app.addLettersArea.css("border", "2px solid #00cc00");
			app.correctMarkArea.append('<p>&#10004;Correct</p>');
			console.log(1);
		} else {
			app.addLettersArea.css("border", "2px solid red");
			app.correctMarkArea.append('<p>&#10008; Incorrect</p>');
			app.correctMarkArea.css("color", "red");
			app.buttonNext.css("visibility", "hidden");
			console.log(2);
		}
	}
});
app.addLettersArea.click(function(event) {
	app.lettersArea.append(event.target);

	// var answ = app.userAnswer.split(""),
	// 	currentLetter = $(event.target).text(),
	// 	i = answ.indexOf(currentLetter);
	// app.userAnswer = app.userAnswer.substring(0, i-1);
	//  // + app.userAnswer.substring(i+1, answ.length - 1);
	// console.log(app.userAnswer);
});

//check answer
// app.check_answer = function(element) {

// }
