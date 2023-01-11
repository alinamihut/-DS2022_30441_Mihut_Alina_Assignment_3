package org.example.file_reader;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class DeviceIdReader {
    Integer deviceId;

    public Integer readDeviceId() throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader("src/main/resources/sensor_files/deviceId.txt"))) {
            String lineString = br.readLine();
            if (lineString != null ) {
                deviceId = Integer.parseInt(lineString);
                return deviceId;
            }
        }

        return null;
    }
}
