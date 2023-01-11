package ro.tuc.ds2022.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EnergyConsumptionDTO {
    private String timestamp;
    private Double consumption;

}
