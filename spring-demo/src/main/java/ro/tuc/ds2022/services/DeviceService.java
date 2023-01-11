package ro.tuc.ds2022.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.tuc.ds2022.dtos.DeviceDTO;
import ro.tuc.ds2022.dtos.DeviceMappingDTO;
import ro.tuc.ds2022.dtos.builders.DeviceBuilder;
import ro.tuc.ds2022.entities.Device;
import ro.tuc.ds2022.entities.User;
import ro.tuc.ds2022.repositories.DeviceRepository;
import ro.tuc.ds2022.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;

    public DeviceService(DeviceRepository deviceRepository, UserRepository userRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
    }

    public Boolean insertDevice(DeviceDTO dto) {
        DeviceBuilder deviceBuilder = new DeviceBuilder();
        Device device = deviceBuilder.toEntity(dto);
        deviceRepository.save(device);
        return true;
    }

    public Boolean updateDevice(DeviceDTO dto, Integer idDevice) {
        Optional<Device> newDevice = deviceRepository.findByIdDevice(idDevice);
        newDevice.get().setName(dto.getName());
        newDevice.get().setAddress(dto.getAddress());
        newDevice.get().setDescription(dto.getDescription());
        newDevice.get().setMaxHourlyEnergyConsumption(dto.getMaxHourlyEnergyConsumption());
        deviceRepository.save(newDevice.get());
        return true;
    }

    public List<Device> getListOfDeviceNames() {
        return deviceRepository.findAll();
    }

    public Optional<Device> findByName(String name) {
        return deviceRepository.findByName(name);
    }

    public List<Device> findAllForUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return deviceRepository.findByUser_IdUser(user.get().getIdUser());
    }

    public Optional<Device> findById(Integer id) {
        return deviceRepository.findById(id);
    }

    @Transactional
    public void deleteDevice(String name)
    {
        Optional<Device> device = findByName(name);
        if (device.get().getUser()!=null){
            device.get().setUser(null);
        }
        deviceRepository.save(device.get());
        deviceRepository.delete(device.get());
    }

    public boolean createMapping (DeviceMappingDTO mapping){
        Optional<Device> device = deviceRepository.findByName(mapping.getDeviceName());
        Optional<User> user = userRepository.findByUsername(mapping.getUsername());
        if (device.get().getUser()!=null && device.get().getUser().getUsername()!=user.get().getUsername()){
            return false;
        }
        device.get().setUser(user.get());
        deviceRepository.save(device.get());
        return true;
    }
}
