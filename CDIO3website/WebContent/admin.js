
$(document).ready(function(){




	$("#ShowUsers").click(function(){
		updateTable();
	});

	$("#CreateUser").click(function(){
		if($("#CU_UserInputFields").is(":hidden"))
		{
			$("#CU_UserInputFields").show();

		}
		else
		{
			$("#CU_UserInputFields").hide();
		}
	});

	$("#CPR").keyup(function(){
		if(this.value.length == this.maxLength)
		{
			$("#CPR2").focus();
		}
	});

	$("#CPR2").keyup(function(){
		if(this.value.length == 0)
		{
			$("#CPR").focus();
		}
	});

	//CU = Create , Update
	$("#CreateUserOK").click(function(e){
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
	var emptyRows = 20
	$("#firstRow").nextAll().html("");
	for(var k = 0; k<emptyRows;k++)
	{
		$("#UserTable").append("<tr class=\"emptyRow\">" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
				"<td></td>" +
		"</tr>");
	}
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