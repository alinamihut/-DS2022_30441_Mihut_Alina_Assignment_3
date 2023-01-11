package ro.tuc.ds2022.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2022.entities.EnergyConsumptionStamp;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnergyConsumptionRepository extends JpaRepository<EnergyConsumptionStamp, Integer > {
    List<EnergyConsumptionStamp> findAllByDevice_IdDevice(Integer id);
    List<EnergyConsumptionStamp> findAllByDevice_Name(String name);

}
