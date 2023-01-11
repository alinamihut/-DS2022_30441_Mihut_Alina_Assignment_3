package ro.tuc.ds2022.dtos.builders;

import ro.tuc.ds2022.dtos.DeviceDTO;
import ro.tuc.ds2022.entities.Device;

public class DeviceBuilder {
    public DeviceBuilder() {
    }

    public static DeviceDTO toDeviceDTO(Device device) {
        return new DeviceDTO(device.getName(),device.getDescription(), device.getAddress(),
                             device.getMaxHourlyEnergyConsumption())  ;
    }

    public static Device toEntity(DeviceDTO dto) {
            return new Device( dto.getName(), dto.getDescription(),
                    dto.getAddress(), dto.getMaxHourlyEnergyConsumption());
    }
}
