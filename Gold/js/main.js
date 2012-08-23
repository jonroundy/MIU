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
				tferrorslink.click("refresh");
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

			//$("#taskFormErrors").validate;
			submitHandler: function() {
				var data = myform.serializeArray();
			storeData(data);
			},
			//submitHandler: function() {
			//var displayLink = myform.displayLink;
			//displayLink.click(getData);
			//}
		});
		

	//any other code needed for addItem page goes here

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autoFillData = function (){
		for(var n in json){
		var id = Math.floor(Math.random()*100000000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
		}
};

var getData = function(){
		if(localStorage.length === 0){
		alert("There are no task's to display. So default data was added.");
		autoFillData();
		}
};

var storeData = function(data){
	var id = Math.floor(Math.random()*100000001);
	localStorage.setItem(id, JSON.stringify(data));
	alert("Task Saved!");
};


var	deleteItem = function (){

};

var clearLocal = function(){

};

	//Get the image for the right category
var getImage = function (catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}

