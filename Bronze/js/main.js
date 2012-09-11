$('#home').on('pageinit', function(){
	//code needed for main page goes here
});	

$('#addTask').on('pageinit', function(){
		//delete $.validator.methods.date;
		var myform = $('#taskinfoform'),
			tferrorslink= $('#tferrorslink')
		;
		
		myform.validate({
			invalidHandler: function(form, validator){
				tferrorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
					var cleanString = html.replace(/[:]/g, ""); //Removes all instances of :

				};
				$("#taskFormErrors ul").html(cleanString, html)
				$("#taskFormErrors p").blink();
		
			},
			submitHandler: function() {
				var data = myform.serializeArray();
				storeData(this.key);
			}
});//End of myform.

	//any other code needed for addItem page goes here
	
});

	//The functions below can go inside or outside the pageinit function for the page in which it is needed.
	
	//getElementById Function
	
function g(x){
		var theElement = document.getElementById(x);
		return theElement;
};
	
function getCheckboxVault(){
		if(g('urgent').checked){
			urgentValue = g('urgent').value;
		}else{
			urgentValue	= "No";
		}
};
		
	// Auto Populate Local Storage.
var autoFillData = function(){
		//Store the JSON OBJECT into Local Storage.
	for(var n in json){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

var getData = function(data){
				if(localStorage.length === 0){
			var autoFill = confirm("There are no task's to display. So default data was added.");
			if(autoFill === true){
			autoFillData();
		}
	}
	var makeDiv = g("datafield");
	var makeList = g("dfId");
	//makeList.setAttribute("style", "list-style:none; padding-left:2px;"); // Style Rules for ul
	makeDiv.appendChild(makeList);	
	for(var i=0, len=localStorage.length; i<len; i++){
		var makeLi = document.createElement("li");
		var linksLi = document.createElement("li");
		makeList.appendChild(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = document.createElement("li");
		//makeSubList.setAttribute("style", "list-style:none; padding-left:2px;");
		
		makeLi.appendChild(makeSubList);
		getImage(obj.cats[1], makeSubList);
		for (var n in obj){
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubLi.innerHTML = optSubText;
			makeSubLi.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);
	}

};

var getImage = function(catName, makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
		imageLi.appendChild(newImg);
	};

	//Make Item Links
	//Create the edit and delete links for each storred item when displayed
var makeItemLinks = function(key, linksLi){
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#addTask";
		editLink.key = key;
		var editText = "Edit Task";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line breakTag
		linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		deleteLink.setAttribute("data-role", "button");
		var deleteText = "Delete Task";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
		
		//add horizontal line
		var hrTag = document.createElement('hr');
		linksLi.appendChild(hrTag);
	};
var storeData = function(key){
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
		var item					= {};
			item.cats				= ["Category List: ", g("categoryList").value];
			item.taskname			= ["Task Name: ", g("taskname").value];
			item.date				= ["Date: ", g("date").value];
			item.time				= ["Time: ", g("time").value];
			item.urgent				= ["Urgent: ", urgentValue];
			item.esttime			= ["Estimated Time.", g("esttime").value];
			item.textbox			= ["Notes: ", g("textbox").value];
			//Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
			//Save form elements into LS
			localStorage.setItem(id, JSON.stringify(item));
			alert("Task Saved!");
		loadPage();
		//letsr();
		

};
//End of storeData.
	
var editItem = function(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//populate the form fields with current localStorage values.
		g('categoryList').value = item.cats[1];
		g('date').value = item.date[1];
		g('time').value = item.time[1];
		if(item.urgent[1] == "on"){
		g('urgent').setAttribute("checked", "checked");
		}
		g('esttime').value = item.esttime[1];
		g('date').value = item.date[1];
		g('textbox').value = item.textbox[1];
		g('time').value = item.time[1];
		g('taskname').value = item.taskname[1];
		console.log(item.cats[1]);
		//Remove the initial listener from the input 'save contact button'
		save.removeEventListener("click");
		//Change the submit button Value to Edit Button
		g('submit').value = "Edit Task";
		var editSubmit = g('submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click");
		editSubmit.key = this.key;
		g("submit").value = "Save Changes";
		$("#submit").button('refresh');
		localStorage.removeItem(this.key)
};
	
var	deleteItem = function(){
		var ask = confirm("Are you sure you want to delete this task?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Entry was deleted");
			window.location.reload();
		}else{
			alert("Task was not deleted!");
		}
};

var clearLocal = function(){
 //Add a request for clear storage when reformat
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{	
			var ask = confirm("Are you sure you want to clear LocalStorage?");
			if(ask){
				localStorage.clear();
				alert("LocalStorage has been cleared!");
				window.location.reload();
		}
		return false;
	}
};

var loadPage = function(){
	var page = $('#loadPage');
	page.click();
	window.location.reload();
};

		//Variable defaults
	urgentValue = "No";
	
	//Set Link & ubmit Click Events
	
var save = g("submit");
	save.addEventListener("click");

var displayLink = g('displayLink');
	displayLink.addEventListener("click", getData);
	
var clearLink = g("clear");
	clearLink.addEventListener("click", clearLocal);
		
var letsr = function(){
	$.mobile.changePage($("#DisplayAll"), "flip", false, true);
}

$('#displayAll').on('pageinit', function(){
		getData(datafield);

});

$('#about').on('pageinit', function(){

});

$('#construction').on('pageinit', function(){

});

$('#grocerys').on('pageinit', function(){

});

$('#misc').on('pageinit', function(){

});

$('#personal').on('pageinit', function(){

});

$('#school').on('pageinit', function(){

});

$('#work').on('pageinit', function(){

});

$('#dialog').on('pageinit', function(){

});

