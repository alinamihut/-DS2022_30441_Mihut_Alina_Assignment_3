package ro.tuc.ds2022.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Measurement {

    @JsonProperty("timestamp")
    private LocalTime timestamp;

    @JsonProperty("device_id")
    private Integer deviceId;

    @JsonProperty("measurement_value")
    private Double measurementValue;

    @Override
    public String toString() {
        return
               timestamp.toString() + ',' +
                        + deviceId + ',' +
                        + measurementValue;
    }
}
