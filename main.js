window.addEventListener('load', e => {
	const settings = {
		fields: ["category", "title", "city", "address", "phone"],
		hiddenFields: [{name: "some_hidden_name", value: "some_hidden_value"}],
		rows: 3,
		formSelector: ".container",
		nameSeparator: "$$",
	};
	const grid = new Grid(settings, 'paste', onPasteHandler);
	document.getElementById('add_row').addEventListener('click', grid.addRow.bind(grid), false);
	document.querySelector('#add_multiple_rows button').addEventListener('click', addMultipleRows.bind(grid), false);
	document.querySelector('#add_multiple_rows input[type=number]').addEventListener('keydown', addMultipleRows.bind(grid), false);
});

function addMultipleRows (e) {
	if (e.type === 'keydown' && e.keyCode !== 13) {return false;}
	this.addRows(document.querySelector('#add_multiple_rows input[type=number]').value);
}

function onPasteHandler (e) {
	e.preventDefault();
	addData(e.currentTarget, e.clipboardData.getData('Text'));
}

function addData (input, text) {
	console.time('addData');
	const [rowInput, columnInput] = [
		parseInt(input.dataset.row),
		parseInt(input.dataset.column)
	];

	const cells = [];
	const rows = text
		.split('\n')
		.forEach((row, index) => {
			cells[index] = row.split('\t');
		});

	cells.forEach((rowData, indexRow) => {
		rowData.forEach((value, indexColumn) => {
			const query = `input[data-row="${indexRow + rowInput}"][data-column="${indexColumn + columnInput}"]`;
			const el = document.querySelector(query);
			if (el) {
				el.value = value.trim();
			}
		});
	});
	console.timeEnd('addData');
}