$('#home').on('pageinit', function(){
	//code needed for home page goes here
	
}
		
$('#addTask').on('pageinit', function(){

		var tlform = $('#taskInfoForm');
			//tlerrorlink = $('#taskFormErrors');
		    tlform.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = tlform.serializeArray();
			parseTaskData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var parseTaskData = function(data){
	
	console.log(data)
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


