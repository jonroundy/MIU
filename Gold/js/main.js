$('#home').on('pageinit', function(){
	//code needed for main page goes here
});	

$('#addTask').on('pageinit', function(){
		delete $.validator.methods.date;
<<<<<<< HEAD
		var myForm = $('#taskInfoForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
=======
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
				$("#taskFormErrors ul").html(cleanString, html);
				$("#taskFormErrors p").blink();
				
			},
			submitHandler: function() {
				var data = myform.serializeArray();
>>>>>>> MIU/gh-pages
			storeData(data);
			}
		});

	//any other code needed for addItem page goes here

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){

};

var getData = function(){

};

var storeData = function(data){
	//if there is no key, this is a new item and will need a key
	var id 			= Math.floor(Math.random()*1000000001);
<<<<<<< HEAD
	localStorage.setItem(id, JSON.stringify(data));
=======
	//Figure out which radio button is selected
	//Save data to local storage: Use Stringify to convert our object to a string.
	localStorage.setItem(id, JSON.stringify(data));
	alert("Honey Do Saved!");
>>>>>>> MIU/gh-pages
	alert("Task Saved!");
}; 


var	deleteItem = function (){

};

var clearLocal = function(){

};


