package ro.tuc.ds2022.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDevice;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "maxConsumption", nullable = false)
    private Integer maxHourlyEnergyConsumption;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "idUser")
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "device", fetch = FetchType.EAGER)
    private List<EnergyConsumptionStamp> energyConsumptionStamps;

    public Device(String name, String description, String address, Integer maxHourlyEnergyConsumption) {
        this.name =  name;
        this.description = description;
        this.address = address;
        this.maxHourlyEnergyConsumption = maxHourlyEnergyConsumption;
    }
}


