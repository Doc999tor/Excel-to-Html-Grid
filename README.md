# ExcelToHtmlGrid
Takes copied cells from Excel file and pastes it into HTML inputs grid

---

### How to use it:
Open any **Excel** or **Google Sheets** file, copy some cells and paste them into text field in your browser.  
Values will fill the cells like in the Excel file.  
If you copied more cells in width or heigth than the browser has, the non fit cells will lose its data, so be carefull.  
You can paste the cells wherever you want (not only in the beginning of the grid).

By default the grid set to 3 rows so you can or

* Edit the **settings** object in `main.js`
* Click on **"Add row"** button
* You can add a bunch of rows by entering desired number for rows you want to add and clicking on **"Add rows"** button
* If you added to many rows, you can **Delete** one or more by pressing on **✖** button
* You can add some custom data from the client to server. Like `user_id` or some hash for future server usage  

`Index.html` file has a form so you can send the data from the grid to `server.php`, it will generate SQL `INSERT` query for all the grid.  
Empty rows will be cutted off the query.  
Numbers will remain numbers and will not be stringified like the rest of types.  

Tested for right-to-left direction (Hebrew and Arabic), you can switch direction with "Switch to rtl/ltr" button

---

### Usage

1. Copy the code from `index.html` the whole `template` tag to your html file, edit the `name` attribute of each input (text field)
2. Add `main.js` file and edit the settings object
3. For generating SQL `INSERT` code use `server.php`
4. For supporting older browsers use [Babel JS](https://babeljs.io/)

---

### Demo
You can play with it here: [https://doc999tor.github.io/Excel-to-Html-Grid/](https://doc999tor.github.io/Excel-to-Html-Grid/)

---

### Future plans
Adding detailed real-world examples with screenshots.  
Creating a jQuery plugin and AngularJS module.  
React component is far future plan.  
