$('#home').on('pageinit', function(){
	//code needed for home page goes here
});
		
$('#addTask').on('pageinit', function(data){

$(document).ready(function(){

		var tlform = $('#taskInfoForm'),
			tlerrorlink = $('#tl errorslink')
		;
		   // console.log(validator.submitted);
		   
		tlform.validate({
			invalidHandler: function(form, validator) {
				tlerrorlink.click();
				for(var key in validator.submitted) {
					var label = $('label[for^="'+ key +'"]');
					label.closest('fieldset')
		};
	},
			submitHandler: function() {
				var data = tlform.serializeArray();
				parseTaskData(data);
		},
	},
	});
	//any other code needed for addItem page goes here
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

//var autofillData = function (){

//});

//var getData = function(){

//};

var parseTaskData = function(data){
	
	console.log(data);
	
}; 

//var	deleteItem = function (){
			
//};
					
//var clearLocal = function(){

//};


