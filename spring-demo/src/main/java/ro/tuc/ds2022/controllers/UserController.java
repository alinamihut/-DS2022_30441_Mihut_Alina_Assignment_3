package ro.tuc.ds2022.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2022.dtos.UserDTO;
import ro.tuc.ds2022.dtos.UserDetailsDTO;
import ro.tuc.ds2022.entities.User;
import ro.tuc.ds2022.services.UserService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@CrossOrigin
@RequestMapping(value="/user")
public class UserController {

    private final UserService userService;
    Logger logger = Logger.getLogger(UserController.class.getName());

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/create", consumes = {"application/json"})
    public ResponseEntity create(@RequestBody UserDTO resource) {
        logger.info("POST method for creating a customer");
        if (userService.insertUser(resource)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists!");
        }
    }

    @PutMapping(path = "/update/{id}", consumes = {"application/json"})
    public ResponseEntity update(@RequestBody UserDTO resource, @PathVariable("id") Integer idUser) {
        logger.info("POST method for creating a customer");
        if (userService.updateUser(resource, idUser)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists!");
        }
    }

    @GetMapping(path = "/find")
    public List<User> findAll() {
        logger.info("GET method for finding all existing customers");
        return userService.getListOfUsers();
    }

    @PostMapping(path = "/login")
    public ResponseEntity loginCustomer(@RequestBody UserDTO resource) {
        Boolean loginUserDone = userService.loginUser(resource.getUsername(),
                resource.getPassword());
        logger.info("POST method for logging in a customer");
        if (loginUserDone) {
            String role = userService.getRoleForUser(resource.getUsername());
            if (Objects.equals(role, "admin")) {
                UserDetailsDTO dto = new UserDetailsDTO("admin");
                return ResponseEntity.status(HttpStatus.OK).body(dto);
            } else if (Objects.equals(role, "client")) {
                UserDetailsDTO dto = new UserDetailsDTO("client");
                return ResponseEntity.status(HttpStatus.OK).body(dto);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

    @GetMapping(value = "/finduser/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("username") String username) {
        Optional<User> dto = userService.findByUsername(username);

        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @DeleteMapping(path="/delete/{username}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity  delete(@PathVariable("username") String name) {
        System.out.println(name);
        logger.info("DELETE method for deleting a user");
        userService.deleteUser(name);
        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully!");
    }

}
