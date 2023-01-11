package ro.tuc.ds2022.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.EnergyConsumptionStamp;
import ro.tuc.ds2022.entities.Measurement;
import ro.tuc.ds2022.repositories.DeviceRepository;
import ro.tuc.ds2022.repositories.EnergyConsumptionRepository;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class EnergyConsumptionService {
    private final EnergyConsumptionRepository energyConsumptionRepository;
    private final DeviceService deviceService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    Logger logger = Logger.getLogger(EnergyConsumptionService.class.getName());

    public EnergyConsumptionService(EnergyConsumptionRepository energyConsumptionRepository, DeviceService deviceService) {
        this.energyConsumptionRepository = energyConsumptionRepository;
        this.deviceService = deviceService;

    }
    public void insertMeasurement(Measurement measurement) {
        Optional<Device> d = deviceService.findById(measurement.getDeviceId());
        EnergyConsumptionStamp energyConsumptionFromDb = findEnergyConsumptionForDeviceAtSpecifiedHour (measurement.getDeviceId(), measurement.getTimestamp());
        if (energyConsumptionFromDb == null){ //no energy cons at that hour
            EnergyConsumptionStamp energyConsumption = new EnergyConsumptionStamp(
                    measurement.getTimestamp(), measurement.getMeasurementValue(), d.get());
            energyConsumptionRepository.save(energyConsumption);
        }
        else{
            energyConsumptionFromDb.setTimestamp(measurement.getTimestamp());
            energyConsumptionFromDb.setEnergyConsumption(energyConsumptionFromDb.getEnergyConsumption() + measurement.getMeasurementValue());
            energyConsumptionRepository.save(energyConsumptionFromDb);
        }
    }

    public List<EnergyConsumptionStamp> findAllForDevice (String name) {
        return energyConsumptionRepository.findAllByDevice_Name(name);
    }

    public void checkIfMeasurementExceedsMaxValue(Measurement measurement) {
        List<EnergyConsumptionStamp> listAtSpecifiedHour = findAllForDeviceAtSpecifiedHour(measurement.getDeviceId(),
                measurement.getTimestamp());
        Double totalConsumptionSoFar=0.0;
        Optional<Device> device = deviceService.findById(measurement.getDeviceId());
        for(EnergyConsumptionStamp e: listAtSpecifiedHour) {
            totalConsumptionSoFar = totalConsumptionSoFar + e.getEnergyConsumption();
        }
        if (totalConsumptionSoFar> device.get().getMaxHourlyEnergyConsumption().doubleValue()){
            logger.warning("MAX HOURLY CONSUMPTION exceeded for device " + device.get().getName());
            logger.warning("Maximum energy consumption value is: " +  device.get().getMaxHourlyEnergyConsumption()
             + "and registered value is:" + totalConsumptionSoFar);
            broadcastNews(device.get(), totalConsumptionSoFar, measurement.getTimestamp());
        }

    }

    @MessageMapping("/news")
    public void broadcastNews(Device device, Double totalConsumptionSoFar, LocalTime time) {
        StringBuilder message = new StringBuilder();
        message.append("MAX HOURLY CONSUMPTION exceeded for device: ")
                .append(device.getName())
                .append(" at time ")
                .append(time.toString())
                .append(". Registered value is: ")
                .append(totalConsumptionSoFar)
                .append(" and maximum energy consumption value is: ")
                .append(device.getMaxHourlyEnergyConsumption());
                this.simpMessagingTemplate.convertAndSendToUser(

        device.getUser().getUsername(),
                "/reply", message);
    }

    public List<EnergyConsumptionStamp> findAllForDeviceAtSpecifiedHour (Integer deviceId, LocalTime time){
        List<EnergyConsumptionStamp> energyConsumptionStamps = energyConsumptionRepository.findAllByDevice_IdDevice(deviceId);
        List<EnergyConsumptionStamp> listAtSpecifiedHour = new ArrayList<>();
        for(EnergyConsumptionStamp e: energyConsumptionStamps){
            if (e.getTimestamp().getHour() == time.getHour()){
                listAtSpecifiedHour.add(e);
            }
        }
        return listAtSpecifiedHour;
    }

    private EnergyConsumptionStamp findEnergyConsumptionForDeviceAtSpecifiedHour (Integer deviceId, LocalTime time){
        List<EnergyConsumptionStamp>energyConsumptionStamps = energyConsumptionRepository.findAllByDevice_IdDevice(deviceId);
        for(EnergyConsumptionStamp e: energyConsumptionStamps){
            if (e.getTimestamp().getHour() == time.getHour()){
                return e;
            }
        }
        return null;
    }



}
