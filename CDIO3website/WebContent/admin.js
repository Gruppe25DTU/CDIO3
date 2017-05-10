
$(document).ready(function(){




	$("#ShowUsers").click(function(){
		sendUserListRequest();
	});





	$("#CreateUser").click(function(){
		if($("#CU_UserInputFields").is(":hidden"))
		{
			$("#CU_UserInputFields").show();
			$("#usernameField").focus();

		}
		else
		{
			$("#CU_UserInputFields").hide();
		}
	});






	//Use this function to check if an element is in an array.
	function inArray(array,keyCode) {
		var length = array.length;
		for (i = 0; i < length;i++) {
			if(array[i] == keyCode) {
				return true;
			}

		}
		return false;
	}
	//Map: 17 pressed == true. If true allow commands. (ctrl A, ctrl C) 
	var map = {17: false, 18: false, 16: false};

	//Numbers only function
	function isNumber(keyCode) {
		var notAllowed = ["107","111","106","192","109","221","222","190", "188", "191", "186", "187","219", "226", "106", "110"];

		if(inArray(notAllowed,keyCode)) {
			return false;
		}
		//Check for letters
		if(keyCode >= 65 && keyCode <= 90) {
			if(!map[17] || map[16]) {
				return false;
			}	
		}

		//Check for numbers
		if((event.keyCode >= 48 && event.keyCode <= 57)) {
			if(map[16] || map[18])
				return false;

		}
		return true;
	}



	$("#CPR").keydown(function() {
		map[event.keyCode] = event.keyCode in map;
		//alert(event.keyCode);

		if(!isNumber(event.keyCode)) {
			event.preventDefault();
		}

		if(this.value.length == this.maxLength && event.keyCode >= 48 && event.keyCode <=57) {
			$("#CPR2").text(event.data);
			$("#CPR2").focus();
		}

	});
	$("#CPR").keyup(function(){
		if(event.keyCode == 186 && event.keyCode == 219)
			event.preventDefault();
		if (event.keyCode in map) {
			map[event.keyCode] = false;
		}

		if(!isNumber(event.keyCode)) {
			event.preventDefault();
		}
		if(this.value.length == this.maxLength)
			$("#CPR2").focus();


	});

	$("#CPR2").keydown(function() {
		if (event.keyCode in map) {
			map[event.keyCode] = true;

		}

		if(!isNumber(event.keyCode)) {
			event.preventDefault();
		}


		if(this.value.length == 0 && event.keyCode == 8) {
			$("#CPR").focus();

		}



	});


	$("#CPR2").keyup(function(){
		if(event.keyCode == 186 && event.keyCode == 219)
			event.preventDefault();
		if (event.keyCode in map) {
			map[event.keyCode] = false;
		}
		if(!isNumber(event.keyCode)) {
			event.preventDefault();
		}
		if(this.value.length == 0 && ($("#CPR").input.length !=6))
		{
			$("#CPR").focus();
		}

	});
	$("#tlf").keydown(function() {
		if (event.keyCode in map) {
			map[event.keyCode] = true;
		}
		if(!isNumber(event.keyCode)) {
			event.preventDefault();
		}
	});


	$("#tlf").keyup(function(){
		if (event.keyCode in map) {
			map[event.keyCode] = false;
		}
		if(!isNumber(event.keyCode)) {
			event.preventDefault();
		}
	});

	$("#FirstnField").keydown(function() {
		if (event.keyCode in map) {
			map[event.keyCode] = true;
		}
		if((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
			event.preventDefault();

		}
	});


	$("#FirstnField").keyup(function(){

		if (event.keyCode in map) {
			map[event.keyCode] = false;
		}
	});

	$("#SurnameField").keydown(function() {
		if (event.keyCode in map) {
			map[event.keyCode] = true;
		}
		if((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
			event.preventDefault();

		}
	});


	$("#SurnameField").keyup(function(){

		if (event.keyCode in map) {
			map[event.keyCode] = false;
		}
	});

	$("#ZipCode").keydown(function() {
		if (event.keyCode in map) {
			map[event.keyCode] = true;
		}
		if(!isNumber(event.keyCode)) {
			event.preventDefault();
		}
	});

	$("#ZipCode").keyup(function() {
		if (event.keyCode in map) {
			map[event.keyCode] = false;
		}
		if(!isNumber(event.keyCode)) {
			event.preventDefault();
		}
	});


	//CU = Create , Update
	$("#CreateUserOK").click(function(e){
		e.preventDefault();
		var formData = $("#CU_UserInputFields").serializeObject();
		formData.cpr = $("#CPR").val()+$("#CPR2").val();
		
		//$("#CU_UserInputFields").trigger('reset');
		
		sendCreateUserForm(formData);


	});

	$("#UpdateUserOK").click(function(e){
		e.preventDefault();

	});

	$("#DeleteUserOK").click(function(e){
		e.preventDefault();

	});

	updateTable();


});

function sendCreateUserForm(formData){
	alert(JSON.stringify(formData));
	$.ajax(
			{
				url : "http://localhost:8080/CDIO3website/rest/users",
				method : 'POST',
				contentType : 'application/json',
				dataType : 'json',
				Accept : "application/json",
				data : JSON.stringify(formData),
				success : function(data){
					console.log(data);
				},
				error : function(jqXHR, text, error){
					console.log(jqXHR.status + text + error);
				}
			});

}

function sendUserListRequest(){
	$.ajax(
			{
				url : "rest/users",
				success : function(data){
					users = data;
					updateTable();
				},
				error : function(jqXHR, text, error){
					console.log(jqXHR.status + text + error);
				}
			}
	);
}

function sendUpdateUserForm(formData)
{
	$.ajax({
		url : "rest/users/"+formData.userid,
		data : JSON.stringify(formData),
		contentType : "application/json",
		method : "PUT",
		success : function(data){

		},
		error : function(jqXHR , text , error){
			alert(jqXHR.status + text + error);
		}
	});
}

function sendDeleteUserRequest(formData)
{
	$.ajax({
		url : "rest/users/"+formData.userid,
		contentType : "application/json",
		method : "DELETE",
		success : function(data)
		{

		},
		error : function(jqXHR , text, error)
		{
			alert(jqXHR.status + text + error);
		}
	});
}

function clickDeleteButton(rowNumber)
{
	alert("clicked delete button nr: "+rowNumber);
}

function clickUpdateButton(rowNumber)
{
	alert("clicked update button nr: "+rowNumber);
	if($("#CU_UserInputFields").is(":hidden"))
	{
		$("#CU_UserInputFields").html(userCreationFormHtml);
		$("#CU_UserInputFields").show();
	}
	else{
		$("#CU_UserInputFields").html(userCreationFormHtml);
	}
}

function updateTable()
{	
	
	var table = "<tr id=\"firstRow\">"+
				"	<th>ID</th>"+
				"	<th>Initials</th>"+
				"	<th>User name</th>"+
				"</tr>";
	$.each(users , function(){
		table += "<tr> <td>"+this["userID"]+"</td>"+
				"<td>"+ this["ini"]+"</td>"+
				"<td>"+ this["userName"]+"</td></tr>";
	});
	$("#UserTable").html(table);

}

var users;
var userPage = 0;
var userCreationFormHtml = "<fieldset>"+
"Username<br> <input type=\"text\" name=\"username\""+
"class=\"inputField\" index=\"usernameField\"><br>"+
"Password<br> <input type=\"text\" name=\"password\""+
"class=\"inputField\"><br> CPR<br> <input"+
"type=\"text\" id=\"CPR\" name=\"cpr\" class=\"inputField\" maxlength=\"6\">-<input"+
"type=\"text\" id=\"CPR2\" class=\"inputField\" maxlength=\"4\"><br>"+
"Roles:<br> Pharmacist<input type=\"checkbox\" value=\"pharmacist\""+
"name=\"role\"> Administrator<input type=\"checkbox\""+
"value=\"admin\" name=\"role\"> <br> Production Manager<input"+
"type=\"checkbox\" value=\"productionManager\" name=\"role\"> Lab"+
"assistant<input type=\"checkbox\" value=\"labAssistant\" name=\"role\"><br>"+
"</fieldset>"+
"<button id=\"CreateUserOK\">Submit</button>";

var userUpdateFormHtml = "<fieldset>"+
"Username<br> <input type=\"text\" name=\"username\""+
"class=\"inputField\" index=\"usernameField\"><br>"+
"Password<br> <input type=\"text\" name=\"password\""+
"class=\"inputField\"><br> CPR<br> <input"+
"type=\"text\" id=\"CPR\" name=\"cpr\" class=\"inputField\" maxlength=\"6\">-<input"+
"type=\"text\" id=\"CPR2\" class=\"inputField\" maxlength=\"4\"><br>"+
"Roles:<br> Pharmacist<input type=\"checkbox\" value=\"pharmacist\""+
"name=\"role\"> Administrator<input type=\"checkbox\""+
"value=\"admin\" name=\"role\"> <br> Production Manager<input"+
"type=\"checkbox\" value=\"productionManager\" name=\"role\"> Lab"+
"assistant<input type=\"checkbox\" value=\"labAssistant\" name=\"role\"><br>"+
"</fieldset>"+
"<button id=\"CreateUserOK\">Submit</button>";

var userDeleteFormHtml = "";
