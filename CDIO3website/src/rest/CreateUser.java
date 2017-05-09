package rest;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("createUser")
public class CreateUser {

	public CreateUser() {
		// TODO Auto-generated constructor stub
	}
	
	@POST
    @Path("/{param}")
	 public Response postMsg(@PathParam("param") String msg) {
        String output = "POST:Jersey say : " + msg;
        return Response.status(200).entity(output).build();
    }

}
