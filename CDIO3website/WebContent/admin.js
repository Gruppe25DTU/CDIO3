
$(document).ready(function(){




	$("#ShowUsers").click(function(){
		updateTable();
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
	var map = {17: false};
	var CPRnotAllowed = ["107","111","106","192","109","221","222","190"];

	$("#CPR").keydown(function() {
		alert(event.keyCode);
		map[event.keyCode] = event.keyCode in map;
		
		if(inArray(CPRnotAllowed,event.keyCode)) {
			event.preventDefault();
		}
		//Check for letters
		if(event.keyCode >= 65 && event.keyCode <= 90) {
			if(!map[17]) {
				event.preventDefault();
			}	
		}
		if(this.value.length == this.maxLength && event.keyCode >= 48 && event.keyCode <=57) {
			$("#CPR2").text(event.data);
			$("#CPR2").focus();
		}

	});
	$("#CPR").keyup(function(){
		if (event.keyCode in map) {
			map[event.keyCode] = false;
		}
		if(this.value.length == this.maxLength)
			$("#CPR2").focus();
		
		
	});

	$("#CPR2").keydown(function() {
		if (event.keyCode in map) {
			map[event.keyCode] = true;
		}
		if(event.keyCode >= 65 && event.keyCode <= 90 && event.keyCode != 107) {
			if(!map[17]) {
				event.preventDefault();
			}	
		}
		if(this.value.length == 0 && event.keyCode == 8) {
			$("#CPR").focus();

		}



	});


	$("#CPR2").keyup(function(){
		if (event.keyCode in map) {
			map[event.keyCode] = false;
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
		if(event.keyCode >= 65 && event.keyCode <= 90 && event.keyCode != 107) {
			if(!map[17]) {
				event.preventDefault();
			}	
		}
	});


	$("#tlf").keyup(function(){
		if (event.keyCode in map) {
			map[event.keyCode] = false;
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
	
	
	
	//CU = Create , Update
	$("#CreateUserOK").click(function(e){
		alert("YOU CLICKED ON SUBMIT");
		e.preventDefault();
		var formData = $("#CU_UserInputFields").serializeJson();
		formData.cpr = $("#CPR").val()+$("#CPR2").val();
		$("#CU_UserInputFields").trigger('reset');
		alert(formData);
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
	$.ajax(
			{
				url: "localhost:8080/rest/createUser",
				data : formData,
				contentType : "application/json",
				method : "POST",
				success : function(data){
					alert(data);
				},
				error : function(jqXHR, text, error){
					alert(jqXHR.status + text + error);
				}
			});

}

function sendUserListRequest(){
	$.ajax(
			{
				url : "localhost:8080/rest/getUserList",
				success : function(data){
					users = data;
				},
				error : function(jqXHR, text, error){
					alert(jqXHR.status + text + error);
				}
			}
	);
}

function sendUpdateUserForm(formData)
{
	$.ajax({
		url : "localhost:8080/rest/updateUser",
		data : formData,
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
		url : "localhost:8080/rest/deleteUser",
		data : formData,
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
	sendUserListRequest();
	if(users != null || users !=undefined)
	{
		var nUsers = users.length();
		emptyRows = nUsers < emptyRows ? nUsers : emptyRows;
		nUsers = nUsers - emptyRows;
		//First fill out empty rows
		for(var i = 0; i<emptyRows ; i++)
		{
			var user = users[i];
		}
	}



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