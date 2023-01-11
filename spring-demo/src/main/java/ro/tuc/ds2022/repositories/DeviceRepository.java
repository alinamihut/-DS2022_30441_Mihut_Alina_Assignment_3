package ro.tuc.ds2022.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2022.entities.Device;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer > {
    Optional<Device> findByIdDevice(Integer id);
    Optional<Device> findByName(String name);
    void deleteByName(String name);
    List<Device> findByUser_IdUser(Integer id);
}
