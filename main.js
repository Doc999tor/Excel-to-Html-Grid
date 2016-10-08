window.addEventListener('load', e => {
	buildGrid();

	Array.from(document.querySelectorAll('input')).forEach(input => {
		input.addEventListener('paste', e => {
			e.preventDefault();
			e.stopPropagation();
			addData(e.currentTarget, e.clipboardData.getData('Text'));
			return false;
		});
	});
})

function addData (input, text) {
	console.time('addData');
	let [rowInput, columnInput] = [
		parseInt(input.dataset.row),
		parseInt(input.dataset.column)
	];

	let cells = [];
	let rows = text
		.split('\n')
		.forEach((row, index) => {
			cells[index] = row.split('\t');
		});
	rows = null;

	cells.forEach((rowData, indexRow) => {
		rowData.forEach((value, indexColumn) => {
			let query = `input[data-row="${indexRow + rowInput}"][data-column="${indexColumn + columnInput}"]`;
			let el = document.querySelector(query);
			if (el) {
				el.value = value;
			}
		});
	});
	console.timeEnd('addData');
}

function buildGrid () {
	const rows = 3;
	console.time('building');
	for (let i = 0; i < rows; i++) {
		buildRow(i);
	}
	console.timeEnd('building');
}

function buildRow (i) {
	let clone = document.importNode(document.getElementById('template_row').content, true);
	let section = clone.querySelector('section');
	section.dataset.row = i;

	Array.from(clone.querySelectorAll('section input')).forEach(input => {
		input.dataset.row = i;
	});
	document.querySelector('.container').appendChild(clone);
}

function addRow() {
	let lastRow = parseInt(Array.from(document.querySelectorAll('.container section')).pop().dataset.row);
	buildRow(lastRow+1);
}