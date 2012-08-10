// Project 3: To Do List
// Visual Frameworks (VFW)
// Mobile Development
// Jon Roundy
// 1207 Week 2

window.addEventListener("DOMContentLoaded", function(){

	//getElementById Function
	function g(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Create select field element and populate with options.
	function makeCats(){
			var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
				selectLi = g('select'),
				makeSelect = document.createElement('select');
				makeSelect.setAttribute("id", "groups");
			for(var i=0, j=categoryLists.length; i<j; i++){
				var makeOption = document.createElement('option');
				var optText = categoryLists[i];
				makeOption.setAttribute("value", optText);
				makeOption.innerHTML = optText;
				makeSelect.appendChild(makeOption);
			}
			selectLi.appendChild(makeSelect);
	}
	
	function getCheckboxVault(){
		if(g('urgent').checked){
			urgentValue = g('urgent').value;
		}else{
			urgentValue	= "No";
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				g('taskForm').style.display = "none";
				g('clear').style.display = "inline";
				g('displayLink').style.display = "none";
				g('addNew').style.display = "inline";
				break;
			case "off":
				g('taskForm').style.display = "block";
				g('clear').style.display = "inline";
				g('displayLink').style.display = "inline";
				g('addNew').style.display = "none";
				g('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//Save data into local storage.
	function storeData(key){
		//If there is no key, this means this is a brand new item and we need a new key.
		if(!key){
			var id					= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same ky that's been passed along from the editSubmit event handler
			//To the validate function, and then passed here, into the storeData function.
			id = key;
		}
			//Gather up all our form field values and store in an object.
			//Object properties are going to contain array with the form label and input value
			getCheckboxVault();
		var item				= {};
			item.cats				= ["Category List: ", g("groups").value];
			item.taskname			= ["My Task Name: ", g("taskname").value];
			item.date				= ["Date: ", g("date").value];
			item.time				= ["Time: ", g("time").value];
			item.urgent				= ["Urgent: ", urgentValue];
			item.slider1			= ["Estimated Time.", g("slider1").value];
			item.textbox			= ["Notes: ", g("textbox").value];
			//Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
			//Save form elements into LS
			localStorage.setItem(id, JSON.stringify(item));
			alert("Task Saved!");
}

	function getData(){
			toggleControls("on");	
				if(localStorage.length === 0){
			alert("There are no task's to display. So default data was added.");
			autoFillData();
		}
		//Write Data from Local Storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		g('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.cats[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/links for each item in local storage.
		}
	
	}
	//Get the image for the right category
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}
	
	// Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT data required for this to work is coming from our json.js file, which is loaded from our HTML page.
		//Store the JSON OBJECT into Local Storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	//Make Item Links
	//Create the edit and delete links for each storred item when displayed
	function makeItemLinks(key, linksLi){
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Task";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Task";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
		//add horizontal line
		var hrTag = document.createElement('hr');
		linksLi.appendChild(hrTag);
	}
	
	function editItem(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off");
		
		//populate the form fields with current localStorage values.
		g('groups').value = item.cats[1];
		g('date').value = item.date[1];
		g('time').value = item.time[1];
		if(item.urgent[1] == "on"){
		g('urgent').setAttribute("checked", "checked");
		}
		g('slider1').value = item.slider1[1];
		g('date').value = item.date[1];
		g('textbox').value = item.textbox[1];
		g('time').value = item.time[1];
		g('taskname').value = item.taskname[1];
	
		//Remove the initial listener from the input 'save contact button'
		save.removeEventListener("click", storeData);
		//Change the submit button Value to Edit Button
		g('submit').value = "Edit Task";
		var editSubmit = g('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	
	}

	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this task?");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Task was not deleted!");
		
		}
	}

	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{	
			localStorage.clear();
			alert("All tasks deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(eData){
		//Define the elements we want to check
		var getCats = g('groups');
		var getTaskName = g('taskname');
		var getDate = g('date');
		var getTime = g('time');
		
		//Reset Error Messages
		errMsg = "";
		getCats.style.border = "1px solid black";
		getTaskName.style.border = "1px solid black";
		getDate.style.border = "1px solid black";
		getTime.style.border = "1px solid black";

	
		//Get Error Messages
		var messageAry = [];
		
		//Cats Validation
		if(getCats.value === "--Choose A Category--"){
			var catsError = "Please choose a category.";
			getCats.style.border = "1px solid red";
			messageAry.push(catsError);
		}
		
		//Task Name Validation
		if(getTaskName.value === ''){
			var tNameError = "Please enter a task name.";
			getTaskName.style.border = "1px solid red";
			messageAry.push(tNameError);
		}
		
		//Date Validation
		if(getDate.value === ''){
			var dateError = "Please enter the date the task is due on.";
			getDate.style.border = "1px solid red";
			messageAry.push(dateError);
		}
		
		//Time Validation
		if(getTime.value === ''){
			var timeError = "Please enter the time of day the task is due on.";
			getTime.style.border = "1px solid red";
			messageAry.push(timeError);
		}
		
		//If there were errors, display them on screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			eData.preventDefault();
		return false;
		}else{
			//If all req info is supplied save our data! Send the key value (which came from the editData function).
			//Remember this key value was passed through the editSubmit event listener as a property.
			storeData(this.key);
		}

	}
	//Variable defaults
	var categoryLists = ["--Choose A Category--", "Personal", "School", "Grocery", "Work", "Misc"],
		urgentValue = "No",
		errMsg = g('errors');
	;
	makeCats();
	
	//Set Link & ubmit Click Events
	
	var displayLink = g('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = g("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = g("submit");
	save.addEventListener("click", validate);
	

	

});
