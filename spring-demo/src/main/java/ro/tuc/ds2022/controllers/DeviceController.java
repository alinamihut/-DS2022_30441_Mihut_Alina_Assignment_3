package ro.tuc.ds2022.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2022.dtos.DeviceDTO;
import ro.tuc.ds2022.dtos.DeviceMappingDTO;
import ro.tuc.ds2022.dtos.builders.DeviceBuilder;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.services.DeviceService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@CrossOrigin
@RequestMapping(value="/device")
public class DeviceController {

    private final DeviceService deviceService;
    Logger logger = Logger.getLogger(DeviceController.class.getName());

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping(path = "/create", consumes = {"application/json"})
    public ResponseEntity create(@RequestBody DeviceDTO resource) {
        logger.info("POST method for creating a device");
        if (deviceService.insertDevice(resource)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("New device added successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't add new device!");
        }
    }
    @PutMapping(path = "/update/{id}", consumes = {"application/json"})
    public ResponseEntity update(@RequestBody DeviceDTO resource, @PathVariable("id") Integer idDevice) {
        logger.info("POST method for creating a customer");
        if (deviceService.updateDevice(resource, idDevice)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Device updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Device couldn't be updated");
        }
    }


    @GetMapping(path = "/findall")
    public List<Device> findAll() {
        return deviceService.getListOfDeviceNames();
    }


    @GetMapping(value = "/find/{name}")
    public ResponseEntity<DeviceDTO> getDevice(@PathVariable("name") String name) {
        Optional<Device> dto = deviceService.findByName(name);

        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @GetMapping(value = "/findbyclient/{username}")
    public List<DeviceDTO> getDeviceForClient(@PathVariable("username") String username) {
        List<Device> devices = deviceService.findAllForUser(username);
        DeviceBuilder builder=  new DeviceBuilder();
        List<DeviceDTO> dtos = new ArrayList();
        for (Device d:devices){
            DeviceDTO dto = builder.toDeviceDTO(d);
            dtos.add(dto);

        }
        return dtos;
    }

    @DeleteMapping(path="/delete/{name}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity  delete(@PathVariable("name") String name) {
        logger.info("DELETE method for deleting a device");
        deviceService.deleteDevice(name);
        return ResponseEntity.status(HttpStatus.OK).body("Device deleted successfully!");
    }

    @PostMapping(path = "/adduser", consumes = {"application/json"})
    public ResponseEntity createMappping(@RequestBody DeviceMappingDTO resource) {
        logger.info("POST method for creating a device");
        if (deviceService.createMapping(resource)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Mapping added successfully!");
        } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not create mapping");
        }
    }

}
