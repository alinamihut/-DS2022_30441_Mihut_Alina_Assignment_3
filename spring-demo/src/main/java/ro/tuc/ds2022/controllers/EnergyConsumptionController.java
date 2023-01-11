package ro.tuc.ds2022.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2022.dtos.DeviceDTO;
import ro.tuc.ds2022.dtos.EnergyConsumptionDTO;
import ro.tuc.ds2022.dtos.builders.DeviceBuilder;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.EnergyConsumptionStamp;
import ro.tuc.ds2022.services.EnergyConsumptionService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value="/energyconsumption")
public class EnergyConsumptionController {

    private final EnergyConsumptionService energyConsumptionService;

    @Autowired
    public EnergyConsumptionController(EnergyConsumptionService energyConsumptionService) {
        this.energyConsumptionService = energyConsumptionService;
    }


    @GetMapping(value = "/findbydevice/{name}")
    public List<EnergyConsumptionDTO> getDeviceForClient(@PathVariable("name") String name) {
        List<EnergyConsumptionStamp> energyConsumptionStamps = energyConsumptionService.findAllForDevice(name);
        List<EnergyConsumptionDTO> dtos = new ArrayList();
        for (EnergyConsumptionStamp e: energyConsumptionStamps){
            EnergyConsumptionDTO dto = new EnergyConsumptionDTO();
            dto.setConsumption(e.getEnergyConsumption());
            dto.setTimestamp(e.getTimestamp().toString());
            dtos.add(dto);

        }
        return dtos;
    }
}
