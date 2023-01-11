package ro.tuc.ds2022.services;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.tuc.ds2022.dtos.UserDTO;
import ro.tuc.ds2022.dtos.builders.UserBuilder;
import ro.tuc.ds2022.entities.User;
import ro.tuc.ds2022.entities.UserRole;
import ro.tuc.ds2022.repositories.UserRepository;
import org.mindrot.jbcrypt.BCrypt;

@Service
public class UserService {
    private final UserRepository userRepository;
    Logger logger = Logger.getLogger(UserService.class.getName());

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Boolean insertUser(UserDTO dto) {
        UserBuilder userBuilder = new UserBuilder();
        User user = userBuilder.toEntity(dto);
        System.out.println(user.getFirstName() + user.getLastName() + user.getRole() + user.getUsername() + user.getPassword());
        if (checkIfUsernameExists(user.getUsername())){
            logger.warning("Could not insert customer");
            return false;
        }
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);
        logger.info("Inserting customer in the db");
        userRepository.save(user);
        return true;
    }

    public Boolean updateUser(UserDTO dto, Integer idUser) {

        Optional<User> newUser = userRepository.findByIdUser(idUser);
        if (!newUser.get().getUsername().equals(dto.getUsername())){
        if (checkIfUsernameExists(dto.getUsername())){
            logger.warning("Could not update user");
            return false;
        }}
        newUser.get().setFirstName(dto.getFirstName());
        newUser.get().setLastName(dto.getLastName());
        newUser.get().setUsername(dto.getUsername());
        if (dto.getRole().equals("CLIENT")) {
                newUser.get().setRole(UserRole.CLIENT);
        }
        else if (dto.getRole().equals("ADMINISTRATOR")){
            newUser.get().setRole(UserRole.ADMINISTRATOR);
        }

        logger.info("Inserting customer in the db");
        userRepository.save(newUser.get());
        return true;
    }

    public List<User> getListOfUsers() {
        logger.info("Retrieving all customers from the DB");
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username) {
        logger.info("Found customer with username " + username);
        return userRepository.findByUsername(username);
    }

    public Boolean loginUser(String username, String password) {
        Optional<User> userFromDB = userRepository.findByUsername(username);
        if (!userFromDB.isPresent()) {
            logger.warning("Customer with username " + username + "doesn't exist in the DB");
            return false;
        } else {
            logger.info("Customer with username " + username + "logged in successfully");
            if (BCrypt.checkpw(password, userFromDB.get().getPassword())){
                    return true;
                }
            }

        logger.warning("Customer with username " + username + "couldn't be logged in");
        return false;
    }

    public String getRoleForUser(String username) {
        Optional<User> userFromDB = userRepository.findByUsername(username);

        if (userFromDB.get().getRole() == UserRole.ADMINISTRATOR){
            return "admin";
        }
        else if (userFromDB.get().getRole() == UserRole.CLIENT){
            return "client";
        }
        else return "";
    }
    public boolean checkIfUsernameExists( String username){
        List<User> allUsers = getListOfUsers();
        for (User user: allUsers){
            if (user.getUsername().equals(username)){
                logger.info("Found customer with username " + username);
                return true;
            }
        }
        logger.warning("Couldn't find admin with username " + username);
        return false;

    }
    public Optional<User> findById(Integer id) {
        logger.info("Retrieving customer with id " + id + "from the DB");
        return userRepository.findByIdUser(id);
    }

    @Transactional
    public void deleteUser(String name)
    {
        Optional<User> user = userRepository.findByUsername(name);
        user.get().getDevices().forEach(device -> device.setUser(null));
        logger.info("Deleting user from the DB");
        userRepository.deleteByUsername(name);
    }
}