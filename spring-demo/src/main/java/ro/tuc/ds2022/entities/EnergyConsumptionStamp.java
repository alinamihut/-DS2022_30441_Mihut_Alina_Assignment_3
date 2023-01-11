package ro.tuc.ds2022.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EnergyConsumptionStamp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEnergyConsumptionStamp;

    @Column(name = "timestamp", nullable = false)
    private LocalTime timestamp;

    @Column(name = "energy_consumption")
    private Double energyConsumption;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "idDevice")
    private Device device;

    public EnergyConsumptionStamp(LocalTime timestamp, Double energyConsumption, Device device) {
        this.timestamp = timestamp;
        this.energyConsumption = energyConsumption;
        this.device = device;
    }
}
