package rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import dal.IUserDAO;
import dal.IUserDAO.DALException;
import dal.UserDAOBasic;
import dto.UserDTO;
import persistency.MemorySaver;
import persistency.IPersistency;

@Path("users")
public class RestService {
  
  static final IPersistency persistency = new MemorySaver();
  static final IUserDAO dao = new UserDAOBasic(persistency);
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	 public Response postMsg(UserDTO data) {
        try {
          dao.getAvailableIDs().stream().min(Integer::compareTo).ifPresent(data::setUserId);
          dao.saveUser(data);
        } catch (DALException e) {
          return Response.status(Status.BAD_REQUEST).build();
        }
        System.out.println(data);
        String output = "POST:Jersey say : " + data;
        return Response.status(200).entity(output).build();
    }
	
	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response putMsg(UserDTO data, @PathParam("id") int id) {
	  try {
	    dao.getUser(id);
	    if (data.getUserID() == -1) {
	      data.setUserID(id);
	    }
	    dao.updateUser(data, id);
	    return Response.ok().build();
	  } catch (DALException e) {
	    return Response.notModified().build();
	  }
	}
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<UserDTO> getMsg() {
	  try {
      return dao.getUserList();
    } catch (DALException e) {
      return null;
    }
	}
	
	@DELETE
	@Path("{id}")
	public Response putMsg(@PathParam("id") int id) {
	  try {
	  if (dao.deleteUser(id)) {
	    return Response.ok().build();
	  }
	  } catch (DALException e) {
	    
	  }
	  return Response.status(Status.NOT_FOUND).build();
	}
}
