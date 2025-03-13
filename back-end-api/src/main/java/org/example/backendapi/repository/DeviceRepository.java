package org.example.backendapi.repository;

import org.example.backendapi.Entity.AccountEntity;
import org.example.backendapi.Entity.CategoryEntity;
import org.example.backendapi.Entity.DeviceEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeviceRepository extends JpaRepository<DeviceEntity, Long> {


    @Query("SELECT d FROM DeviceEntity d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<DeviceEntity> findByNameLikeIgnoreCase(String name);

    List<DeviceEntity> findByStatus (String status);

    @Query("SELECT d from DeviceEntity d where " +
            "(:id IS NULL OR CAST(d.id AS string) LIKE CONCAT('%', CAST(:id AS string), '%')) AND " +
            "(:name IS NULL OR d.name LIKE CONCAT('%', :name, '%')) AND" +
            "(:description IS NULL OR d.description LIKE CONCAT('%', :description, '%')) AND" +
            "(:type IS NULL OR d.category.name LIKE CONCAT('%', :type, '%') )" )
    Page<DeviceEntity> searchUser(Pageable pageable,
                                       @Param("id") Long id,
                                       @Param("name") String name,
                                       @Param("description") String description,
                                       @Param("type") String type);
}
