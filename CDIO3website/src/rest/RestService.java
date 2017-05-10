package rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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
        String output = "POST:Jersey say : " + data;
        try {
          dao.getAvailableIDs().stream().min(Integer::compareTo).ifPresent(data::setUserId);
          dao.saveUser(data);
        } catch (DALException e) {
          return Response.status(Status.BAD_REQUEST).build();
        }
        System.out.println(data);
        return Response.status(200).entity(output).build();
    }
}
