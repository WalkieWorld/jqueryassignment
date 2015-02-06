$(function(){
	
	var isPhone = true,
		phoneCnt = 0;

	$("button").on("click", function(){

		if($("#name").val().length === 0){
			
			$("#name").addClass("invalid");
			$("#errorName").text("Required!");
			$("#errorName").removeClass("hidden");
			$("#errorName").addClass("show");
		}else{

			$("#name").removeClass("invalid");
			$("#errorName").text("");
			$("#errorName").removeClass("show");
			$("#errorName").addClass("hidden");
		}

		if($("#addr").val().length === 0){			
			
			$("#addr").addClass("invalid");
			$("#errorAddr").text("Required!");
			$("#errorAddr").removeClass("hidden");
			$("#errorAddr").addClass("show");
		}
		else{

			$("#addr").removeClass("invalid");
			$("#errorAddr").text("");
			$("#errorAddr").removeClass("show");
			$("#errorAddr").addClass("hidden");
		}

		if($("#email").val().length === 0 || $("#email").val().indexOf("@") === -1){

			$("#email").addClass("invalid");
			$("#email").val().length === 0 	? $("#errorEmail").text("Required!") 
											: $("#errorEmail").text("Wrong Format!");
			$("#errorEmail").removeClass("hidden");
			$("#errorEmail").addClass("show");
		}
		else{

			$("#email").removeClass("invalid");
			$("#errorEmail").text("");
			$("#errorEmail").removeClass("show");
			$("#errorEmail").addClass("hidden");
		}

		if($("#phone").val().length !== 13 || $("#phone").hasClass("invalid")){

			$("#phone").addClass("invalid");
			$("#phone").val().length === 0 	? $("#errorPhone").text("Required!") 
											: $("#errorPhone").text("Wrong Number!");
			// if($("#phone").val().length !== 13 && $("#phone").val().length !== 0)
			// {
			// 	$("#errorPhone").text("Please finish the right phone number!");
			// } 
			$("#errorPhone").removeClass("hidden");
			$("#errorPhone").addClass("show");
		}
		else{

			$("#phone").removeClass("invalid");
			$("#errorPhone").text("");
			$("#errorPhone").removeClass("show");
			$("#errorPhone").addClass("hidden");
		}

		if($("input.invalid").length === 0 ){
			
			alert("Valid Input");
		}else{
			
			return false;
		}
	});

	// format phone number
	var formatPhone = function(arr){

		var newPhone = [];

		$.each(arr, function(index, curVal){

			switch(index){
				case 0:
					newPhone.push("(");
					break;
				case 3:
					newPhone.push(")");
					break;
				case 6:
					newPhone.push("-");
					break;
				default:
					break;
			}

			newPhone.push(curVal);
		});
		return newPhone.join("");
	};

	$("#phone").on("keyup", function(event){
		
		var len = 0;

		if(phoneCnt === 0){
			$.each($("#phone").val().split(""), function(index, curVal){

				if(!isNaN(curVal)){
					len ++;
				}

				if(len !== $("#phone").val().split("").length){
					$("#phone").addClass("invalid");
					$("#phone").removeClass("valid");
				}
				else{
					$("#phone").removeClass("invalid");
					$("#phone").addClass("valid");
				}
			});
		}
		
		if(event.which !== 8 
			&& event.which !== 9
			&& event.which !== 17
			&& event.which !== 37 
			&& event.which !== 38 
			&& event.which !== 39
			&& event.which !== 40 
			&& ((event.which < 48 || event.which > 57) 
				&& (event.which < 96 || event.which > 105))) {
			
			isPhone = false;
			$("#phone").addClass("invalid");
			$("#phone").removeClass("valid");
		}

		if(len === 10){

			$("#phone").removeClass("invalid");
			$("#phone").addClass("valid");
			$("#phone").val(formatPhone($("#phone").val().split("")));
			phoneCnt = 1;
			isPhone = true;
		}

		if(phoneCnt === 1 && $("#phone").val().length === 12 && event.which === 8){

			var newPhone = [];

			$.each($("#phone").val().split(""), function(index, curVal){

				if(curVal !== '(' && curVal !== ')' && curVal !== '-'){

					newPhone.push(curVal);
				}
			});

			$("#phone").val(newPhone.join(""));
			len = $("#phone").val().length;
			phoneCnt = 0;
		}
	});
});