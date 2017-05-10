package rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("createUser")
public class CreateUser {

	public CreateUser() {
		// TODO Auto-generated constructor stub
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	 public Response postMsg(@PathParam("param") String msg) {
        String output = "POST:Jersey say : " + msg;
        return Response.status(200).entity(output).build();
    }

}
