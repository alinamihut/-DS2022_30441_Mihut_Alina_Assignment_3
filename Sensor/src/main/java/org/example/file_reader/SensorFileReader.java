package org.example.file_reader;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class SensorFileReader {

    Double measurementValue;


    public Double readFromFile() throws IOException {
        String line = "";
        int lineIndex=0;
        try (BufferedReader br = new BufferedReader(new FileReader("src/main/resources/sensor_files/sensor.csv"))) {
            while ((line = br.readLine()) != null)
            {
                lineIndex++;
                try (BufferedReader brIndex = new BufferedReader(new FileReader("src/main/resources/sensor_files/lineIndex.txt"))) {
                    String lineString = brIndex.readLine();
                    if (lineString == null || lineIndex == Integer.parseInt(lineString)) {
                        measurementValue = Double.parseDouble(line);
                        System.out.println(measurementValue);
                        FileWriter fw = new FileWriter("src/main/resources/sensor_files/lineIndex.txt", false);
                        lineIndex++;
                        fw.write(Integer.toString(lineIndex));
                        fw.close();
                        return measurementValue;
                    }
                }
            }
            return null;
        }
    }





}

