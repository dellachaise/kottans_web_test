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
	lettersArea: $("#lettersBlock")
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
	for(var key in data) {
		if(key === "id") {
			app.id = data[key];
		} else if(key === "answer") {
			app.answer = data[key];
		} else if(key === "question") {
			app.question = data[key];
		} else if(key === "category") {
			app.category = data[key];
		}
	}
} 

app.set_letters = function () {
	var length = app.answer.length;
	for(var i = 0; i < length; i += 1) {
		app.lettersArea.append('<button>' + app.answer[i] + '</button>');
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




