# ExcelToHtmlGrid
Takes copied cells from Excel file and pastes it into HTML inputs grid

### How to use it:
Open any **Excel** or **Google Sheets** file, copy some cells and paste them into text field in your browser.  
Values will fill the cells like in the Excel file.  
If you copied more cells in width or heigth than the browser has, the non fit cells will lose its data, so be carefull.  
You can paste the cells wherever you want (not only in the beginning of the grid).   

By default the grid set to 3 rows so you can or

* edit the settings object in `main.js`
* click on "Add row" button

`Index.html` file has a form so you can send the data from the grid to `server.php`, it will generate SQL `INSERT` query for all the grid. 

Tested for right-to-left direction (Hebrew and Arabic), you can switch direction with "Switch to rtl/ltr" button  

---

### Usage

1. Copy the code from `index.html` the whole `template` tag to your html file, edit the `name` attribute of each input (text field)
2. Add `main.js` file and edit the settings object
3. For generating SQL `INSERT` code use `server.php`
4. For supporting older browsers use [Babel JS](https://babeljs.io/)

---

### Demo
You can play with it here: [https://doc999tor.github.io/ExcelToHtmlGrid/](https://doc999tor.github.io/ExcelToHtmlGrid/)