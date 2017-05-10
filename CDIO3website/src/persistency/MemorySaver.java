package persistency;

import dto.UserDTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class MemorySaver implements IPersistency {

    private Map<Integer, UserDTO> userList;

    public MemorySaver() {
        init();
    }

    @Override
    public void init() {
        userList = new HashMap<>();
        UserDTO random1 = new UserDTO(1, "admin", "god", "1234567890", "ub3rP455", new ArrayList<String>(){{this.add("Administrator");}});
        UserDTO random2 = new UserDTO(2, "Donald", "xyz", "0987654321", "2H4rd2Gu355", new ArrayList<String>(){{this.add("labAssistant");}});
        UserDTO random3 = new UserDTO(3, "Duck", "rst", "5647382910", "password", new ArrayList<String>(){{this.add("Operator");}});
        userList.put(1, random1);
        userList.put(2, random2);
        userList.put(3, random3);
    }

    @Override
    public boolean save(UserDTO user) {
        if (userList.containsKey(user.getUserID())) {
            return false;
        }
        userList.put(user.getUserID(), user);
        return true;
    }

    @Override
    public void updateUser(UserDTO user, int origID) {
        if (userList.containsKey(origID)) {
            if (origID != user.getUserID()) {
                userList.remove(origID);
            }
            userList.put(user.getUserID(), user);
        }
    }

    @Override
    public UserDTO getUser(int id) {
        return userList.get(id);
    }

    @Override
    public ArrayList<UserDTO> getUserList() {
        return new ArrayList<>(userList.values());
    }

    @Override
    public Set<Integer> getUserIDList() {
        return userList.keySet();
    }

    @Override
    public boolean deleteUser(int userID) {
        return (userList.remove(userID) != null);
    }

    @Override
    public void quit() {
        userList.clear();
    }
}
