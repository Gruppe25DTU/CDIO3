package rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("hello")
public class HelloService {

	@GET
	public String getHello() {
		return "Hello";
	}
	
	public HelloService() {
		// TODO Auto-generated constructor stub
	}

}
