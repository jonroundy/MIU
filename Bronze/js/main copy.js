$('#home').on('pageinit', function(){
	//code needed for home page goes here
}
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#TaskInfoForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
		//getElementById Function
	function g(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 	//The actual JSON OBJECT data required for this to work is coming from our json.js file, which is loaded from our HTML page.
		//Store the JSON OBJECT into Local Storage.
	for(var n in json){
	var id = Math.floor(Math.random()*100000001);
	localStorage.setItem(id, JSON.stringify(json[n]));
		}
	
};

var getData = function(){

};

var storeData = function(data){
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
		item.cats				= ["Category List: ", g("categoryList").value];
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
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


