//функция фильтрации данных по типу, если type соответствует, то добавляет в массив результатов
const filterByType = (type, ...values) => values.filter(value => typeof value === type);

/**
 * скрывает все div с классом dialog__response-block
 */
const hideAllResponseBlocks = () => {
		//загоняем Nodelist в массив, чтобы можног было использовать функции Array.prototype
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//каждый блок пока скрываем
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	/**
	 * показывает блое к blockSelector
	 * @param blockSelector - селектор блока
	 * @param msgText - текст сообщения
	 * @param spanSelector - span для сообщения
	 */
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();//скрываем все блоки
		document.querySelector(blockSelector).style.display = 'block';//берем нужный блок по селектору
		//если передан селектор для span, то пишем туда сообщение
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	/**
	 * показывает переданную в качестве аргумента ошибку в span c id #error
	 * @param msgText
	 */
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	/**
	 * показывает переданное в качестве аргумента текст сообщения в span c id #ok
	 * @param msgText
	 */
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	/**
	 * показываем блок dialog__response-block_no-results
	 */
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	/**
	 * Фильтрует values по типу
	 */
	tryFilterByType = (type, values) => {
		try {
			// выполняем с помощью eval функцию filterByType, результаты добавляем в строку через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//в зависимости от того, есть ли значения или нет
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			//показываем результаты
			showResults(alertMsg);
		} catch (e) {//перехват исключения - показываем ошибку с помощью showError
			showError(`Ошибка: ${e}`);
		}
	};
//получаем кнопку
const filterButton = document.querySelector('#filter-btn');
//вешаем событие
filterButton.addEventListener('click', e => {
	debugger;
	//получаем элементы
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');
//если поле с данными пустое
	if (dataInput.value === '') {
		//пишем сообщение в стандартный вывод
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//показываем блок сообщением
		showNoResults();
	} else {
		dataInput.setCustomValidity('');//убираем ошибку если она была
		e.preventDefault();//отключаем стандартное поведение
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());//проверяем
	}
});

