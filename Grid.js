class Grid {
	constructor (settings, event, eventHandler) {
		this.settings = Object.assign({
			rows: 5,
			formSelector: "form",
			hiddenFields: [],
			fields: ["col-1", "col-2", "col-3", "col-4"],
			nameSeparator: '-'
		}, settings);
		this.eventHandler = eventHandler;
		this.event = event;
		this.buildGrid();
	}

	buildGrid () {
		console.time('building');
		// CSS fits:
		// length+1 for delete button
		document.documentElement.style.setProperty('--columns', this.settings.fields.length+1);

		Object.defineProperty(this, 'rowsNum', {
			get: function () {return this.settings.rows},
			set: function (val) {
				this.settings.rows = val;
				inputHiddenRowsNum.value = val;
			},
		});

		// Add non-repeating data to the top
		const nonRepeatFragment = document.createDocumentFragment();
		const inputHiddenRowsNum = this.createInput('rows', this.rowsNum, 'hidden');
		nonRepeatFragment.appendChild(inputHiddenRowsNum);
		const inputSeparator = this.createInput('separator', this.settings.nameSeparator, 'hidden');
		nonRepeatFragment.appendChild(inputSeparator);

		// Adding static hidden inputs
		this.settings.hiddenFields.forEach(hidden => nonRepeatFragment.appendChild(this.createInput(hidden.name, hidden.value, 'hidden')));
		const staticHiddenInputNamesList = this.createInput('hidden_input_names', JSON.stringify(this.settings.hiddenFields.map(f => f.name)), 'hidden');
		nonRepeatFragment.appendChild(staticHiddenInputNamesList);

		document.querySelector(this.settings.formSelector).appendChild(nonRepeatFragment);

		this.createRowTemplate();
		const gridTemplate = document.createDocumentFragment();
		for (let i = 0; i < this.rowsNum; i++) {
			gridTemplate.appendChild(this.buildRow(i));
		}
		document.querySelector(this.settings.formSelector).appendChild(gridTemplate);

		document.querySelector(this.settings.formSelector).appendChild(document.querySelector(this.settings.formSelector + ' input[type=submit]'))
		console.timeEnd('building');
	}

	createRowTemplate() {
		this.rowTemplate = document.createDocumentFragment();
		let section = document.createElement('section');
		section = this.rowTemplate.appendChild(section);
		this.settings.fields.forEach((field, index) => {
			const input = this.createInput(field);
			input.dataset.column = index;
			input.placeholder = field[0].toUpperCase() + field.slice(1).toLowerCase();
			section.appendChild(input);
		});
		const deleteButton = document.createElement('button');
		deleteButton.innerText = '✖';
		deleteButton.classList.add('delete-btn');
		section.appendChild(deleteButton);
	}

	buildRow (i) {
		const clone = this.rowTemplate.cloneNode(true);
		const section = clone.querySelector('section');
		section.dataset.row = i;
		section.querySelectorAll('input').forEach((input) => {
			input.dataset.row = i;
			input.name = `${input.name}${this.settings.nameSeparator}${i}`;
			input.addEventListener(this.event, this.eventHandler);
		});
		section.querySelector('.delete-btn').addEventListener('click', e => {
			e.preventDefault();
			this.deleteRow(i);
		})
		return clone;
	}

	createInput (name = '', value = '', type = 'text') {
		const input = document.createElement('input');
		input.type  = type;
		input.name  = name;
		input.value = value;
		return input;
	}

	addRow() {
		document.querySelector(this.settings.formSelector).insertBefore(this.buildRow(this.rowsNum), document.querySelector(this.settings.formSelector + ' input[type=submit]'));
		document.querySelector(this.settings.formSelector + ' input[name=rows]').value = this.rowsNum;
		this.rowsNum++;
	}
	addRows(num) {
		console.time('adding multiple rows');
		num = parseInt(num);
		if (isNaN(num)) {num = 0;}

		const template = document.createDocumentFragment();
		for (let i = this.rowsNum; i < this.rowsNum+num; i++) {template.appendChild(this.buildRow(i));}
		document.querySelector(this.settings.formSelector).insertBefore(template, document.querySelector(this.settings.formSelector + ' input[type=submit]'));
		this.rowsNum += num;
		console.timeEnd('adding multiple rows');
	}

	deleteRow (i) {
		console.time('delete rows');
		document.querySelectorAll(this.settings.formSelector + ' section')[i].remove();
		this.reorderRows(i);
		this.rowsNum--;
		console.timeEnd('delete rows');
	}
	reorderRows(i) {
		let rows = Array.from(document.querySelectorAll(this.settings.formSelector + ' section')).slice(i);
		rows.forEach((row, index) => {
			index += i;
			row.dataset.row = index;
			row.querySelectorAll('input').forEach(input => {
				input.dataset.row = index;
				input.name = input.name.split(this.settings.nameSeparator)[0] + '-' + index;
			});
		});
	}
}