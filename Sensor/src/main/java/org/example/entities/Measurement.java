package org.example.entities;


import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalTime;

public class Measurement {

    @JsonProperty("timestamp")
    private LocalTime timestamp;

    @JsonProperty("device_id")
    private Integer deviceId;

    @JsonProperty("measurement_value")
    private Double measurementValue;

    public Measurement(LocalTime timestamp, Integer deviceId, Double measurement_value) {
        this.timestamp = timestamp;
        this.deviceId = deviceId;
        this.measurementValue = measurement_value;
    }

    public LocalTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalTime timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Integer deviceId) {
        this.deviceId = deviceId;
    }

    public Double getMeasurementValue() {
        return measurementValue;
    }

    public void setMeasurementValue(Double measurementValue) {
        this.measurementValue = measurementValue;
    }

    @Override
    public String toString() {
        return
                timestamp.toString() + ',' +
                        + deviceId + ',' +
                        + measurementValue;
    }
}
