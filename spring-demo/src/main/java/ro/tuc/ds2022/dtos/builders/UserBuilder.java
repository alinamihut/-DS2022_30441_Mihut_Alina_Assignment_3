package ro.tuc.ds2022.dtos.builders;

import ro.tuc.ds2022.dtos.UserDTO;
import ro.tuc.ds2022.entities.User;
import ro.tuc.ds2022.entities.UserRole;

public class UserBuilder {

    public UserBuilder() {
    }

    public static UserDTO toUserDTO(User user) {
        return new UserDTO(user.getFirstName(), user.getLastName(), user.getUsername(), user.getPassword(), user.getRole().toString());
    }

    public static User toEntity(UserDTO userDTO) {
        if (userDTO.getRole().equals("CLIENT")){
            return new User(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getUsername(), userDTO.getPassword(), UserRole.CLIENT);
        }
        else {
            return new User(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getUsername(), userDTO.getPassword(), UserRole.ADMINISTRATOR);
        }

    }
}
