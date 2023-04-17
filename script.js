let currentCity = document.querySelector('#current_city'),
	goalCity = document.querySelector('#goal_city'),
	house = document.querySelector('#house'),
	transport = document.querySelector('#transport'),
	renter = document.querySelector('.renter'),
	owner = document.querySelector('.owner'),
	car = document.querySelector('.car'),
	pub_tr = document.querySelector('.pub_tr'),
	taxi = document.querySelector('.taxi'),

	user_salary = document.querySelector('.user_salary'),
	user_food = document.querySelector('.user_food'),
	user_bills = document.querySelector('.user_bills'),
	user_rent = document.querySelector('.user_rent'),
	user_car = document.querySelector('.user_car'),
	user_taxi = document.querySelector('.user_taxi'),
	user_pb_tr = document.querySelector('.user_pb_tr'),

	btnCount = document.querySelector('.btn_count'),
	res = document.querySelector('.res');



house.addEventListener('change', function () {
	if (this.value == 'owner') {
		renter.classList.add('hide');
	} else {
		renter.classList.remove('hide');
	}
})

transport.addEventListener('change', function () {
	if (this.value == 'car') {
		show_hide(car, pub_tr, taxi);
	} else if (this.value == 'pub_tr') {
		show_hide(pub_tr, car, taxi);
	} else if (this.value == 'taxi') {
		show_hide(taxi, pub_tr, car);
	} 
})

// еще надо удалять value!! потому что я могу ввести, потом выбрать другое, а инфа останется

function show_hide(showelem, hideelem1, hideelem2) {
	showelem.classList.remove('hide');
	if (hideelem1) {
	// почему не очищается, а отображается как будто очистилось? И в подсчетах непрвильно
	// в консоль если вывести value получается 0, но в самом поле остается введенное и, наверно, как следствие забирается кнопкой подсчитать
	// textContent, innerText не помогают
		hideelem1.value = '';
		hideelem1.classList.add('hide');
	}
	if (hideelem2) {
		hideelem2.value = '';
		hideelem2.classList.add('hide');
	}
}
// получить значение текущего города
// получить значение желаемого города
// сравнить все показатели этих двух городов: текущий город/целевой город = 100%/x ---> целевой город*100/тек.город
// сделать x процентовым = это соотношение показателей городов
// умножить данные пользвателя тек.город на x%, готово

currentCity.addEventListener('change', function () {
	showAllCities(goalCity);
	deleteSameCity(currentCity, goalCity);	
})

function deleteSameCity(currentCity, goalCity) {
	let sel = currentCity.selectedIndex;
	let optionList = goalCity.options;
    optionList[sel].setAttribute('style', 'display:none;');
}

function showAllCities(goalCity) {
	let optionList = goalCity.options;
	for (i = 0; i < optionList.length; i++) {
        optionList[i].setAttribute('style', 'display:block;');
    }
}

// тоже можно как-то модернизировать, но пока хз как, не знаю, как параметр в переменную с таким же именем помещать
function compare(toCompare1, toCompare2) {
	let salaryX = (toCompare2.salary * 100 / toCompare1.salary)/100;
	let foodX = (toCompare2.food * 100 / toCompare1.food)/100;
	let rentX = (toCompare2.rent * 100 / toCompare1.rent)/100;
	let billsX = (toCompare2.bills * 100 / toCompare1.bills)/100;
	let carX = (toCompare2.car * 100 / toCompare1.car)/100;
	let taxiX = (toCompare2.taxi * 100 / toCompare1.taxi)/100;
	let pb_trX = (toCompare2.pb_tr * 100 / toCompare1.pb_tr)/100;
	let arr = [salaryX, foodX, rentX, billsX, carX, taxiX, pb_trX];
	return arr;

}
function getAllValue() {
	// почему-то вот это .replace(/\D/g, "") не помогает избавиться от нецифр, почему-то удаляет вообще все. 
	// мб потому что это не строка?
	// попробовала toString(), не помогло
	let userValue = [user_salary.value,
	user_food.value,
	user_bills.value,
	user_rent.value,
	user_car.value,
	user_taxi.value,
	user_pb_tr.value];


	return userValue;
}

function count (a,b) {
	let c = [];
	if (a.length == b.length) {
		for (var i = 0; i < a.length; i++) {
			let d = Math.round(a[i]*b[i]);
			c.push(d);
		}
	}
	return c;
}


btnCount.addEventListener('click', function () {
	let a = compare(cities[currentCity.value], cities[goalCity.value]);
	console.log(a);
	let b = getAllValue();
	let results = count(a,b);
	showResults(results, res);
})


// решить проблему с нолями - надо делать какую-то проверку... Только как
// если делать results[i] == 0, то моя система с названиями рухнет. Мб сделать массив с названиями?
// results = [55005, 10000, 2000, 0, 0, 2500, 0]
// keys = ["зп", "еда", "ЖКХ", "аренда", "машина, "общ", "такси"]
// и просто if (results[i] == '') {results[i].splice и keys[j].splice или как-то так}
// а потом в innerHTML keys[j] + results[i]
// но тут опять проблема в value

function showResults (results, block) {
	block.innerHTML = 'Что вас ждет при переезде: ' + '</br>' + 'Зп ' + results[0] + '</br>' + 'Еда ' + results[1] + '</br>' + ' ЖКХ ' + results[2] + '</br>'+ 
	'Аренда ' + results[3] + '</br>' + 'Машина ' + results[4] + '</br>' +'Такси ' + results[5] + '</br>' + 'Общ.транспорт ' + results[6]; 
}


