Array.from(document.querySelectorAll('input')).forEach(input => {
	input.addEventListener('paste', e => {
		e.preventDefault();
		e.stopPropagation();
		addData(e.currentTarget, e.clipboardData.getData('Text'));
		return false;
	});
});

function addData (input, text) {
	console.time('addData');
	let [rowInput, columnInput] = [
		parseInt(input.dataset.row.match(/\d/)[0]),
		parseInt(input.dataset.column.match(/\d/)[0])
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
			let query = `input[data-row=row-${indexRow + rowInput}][data-column=cl-${indexColumn + columnInput}]`;
			let el = document.querySelector(query);
			if (el) {
				el.value = value;
			}
		});
	});
	console.timeEnd('addData');
}