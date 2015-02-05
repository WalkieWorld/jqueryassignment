$(function(){
	
	var isPhone = true,
		phoneCnt = 0;

	$("button").on("click", function(){

		if($("#name").val().length === 0){
			
			$("#name").addClass("invalid");
		}else{

			$("#name").removeClass("invalid");
		}

		if($("#addr").val().length === 0){			
			
			$("#addr").addClass("invalid");
		}
		else{

			$("#addr").removeClass("invalid");
		}

		if($("#email").val().length === 0 || $("#email").val().indexOf("@") === -1){

			$("#email").addClass("invalid");
		}
		else{

			$("#email").removeClass("invalid");
		}

		if($("#phone").val().length === 0){

			$("#phone").addClass("invalid");
		}
		else{

			$("#phone").removeClass("invalid");
		}

		if($(".invalid").length === 0 ){
			
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
		
		var len = $("#phone").val().length;
		if(event.which < 48 || event.which > 57){
			
			isPhone = false;
		}

		if(len === 10){

			if(!isPhone){

				$("#phone").addClass("invalid");
				$("#phone").removeClass("valid");
			}else{

				$("#phone").removeClass("invalid");
				$("#phone").addClass("valid");
				

				$("#phone").val(formatPhone($("#phone").val().split("")));
				phoneCnt = 1;
			}

			isPhone = true;
		}else{

			if(phoneCnt === 1){

				var newPhone = [];

				$.each($("#phone").val().split(""), function(index, curVal){

					if(curVal !== '(' && curVal !== ')' && curVal !== '-'){

						newPhone.push(curVal);
					}
				});

				$("#phone").val(formatPhone($("#phone").val().split("")));
				phoneCnt = 0;
			}
		}
	});
});