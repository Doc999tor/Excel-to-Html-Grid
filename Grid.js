class Grid {
	constructor (settings) {
		this.settings = settings || {
			rows: 5,
			querySelector: "form"
		}
		this.buildGrid();
	}

	buildGrid () {
		const rows = this.settings.rows;
		console.time('building');
		let inputHidden = document.createElement('input');
			inputHidden.type = 'hidden';
			inputHidden.name = 'rows';
			inputHidden.value = rows;
		document.querySelector(this.settings.querySelector).insertBefore(inputHidden, document.querySelector(this.settings.querySelector + 'input[type=submit]'));
		for (let i = 0; i < rows; i++) {
			this.buildRow(i);
		}
		console.timeEnd('building');
	}

	buildRow (i) {
		let clone = document.importNode(document.getElementById('template_row').content, true);
		let section = clone.querySelector('section');
		section.dataset.row = i;

		Array.from(clone.querySelectorAll('section input')).forEach(input => {
			input.dataset.row = i;
			input.name += `-${i}`;
		});
		document.querySelector(this.settings.querySelector).insertBefore(clone, document.querySelector(this.settings.querySelector + 'input[type=submit]'));
		document.querySelector(this.settings.querySelector + ' input[name=rows]').value = i+1;
	}

	addRow() {
		console.log(this);
		let lastRow = parseInt(Array.from(document.querySelectorAll(this.settings.querySelector + ' section')).pop().dataset.row);
		this.buildRow(lastRow+1);
	}
	addRows(num) {
		console.time('adding multiple rows');
		num = parseInt(num);
		if (isNaN(num)) {num = 0;}
		for (let i = 0; i < num; i++) {this.buildRow(i);}
		console.timeEnd('adding multiple rows');
	}
}