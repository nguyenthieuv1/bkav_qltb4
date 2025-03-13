package org.example.backendapi.repository;

import org.example.backendapi.Entity.AccountEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<AccountEntity,Long> {
    AccountEntity findByUsername(String username);
    AccountEntity findByRole(String role);
    Page<AccountEntity> findAll(Pageable pageable);
    @Query("SELECT a FROM AccountEntity a WHERE " +
            "(:username IS NULL OR a.username LIKE CONCAT('%', :username, '%')) AND " +
            "(:role IS NULL OR a.role LIKE CONCAT('%', :role, '%')) AND " +
            "(:fullName IS NULL OR a.fullName LIKE CONCAT('%', :fullName, '%')) AND " +
            "(:address IS NULL OR a.address LIKE CONCAT('%', :address, '%')) AND " +
            "(:phone IS NULL OR a.phone LIKE CONCAT('%', :phone, '%'))")
    Page<AccountEntity> searchAccounts(Pageable pageable,
                                       @Param("username") String username,
                                       @Param("role") String role,
                                       @Param("fullName") String fullName,
                                       @Param("address") String address,
                                       @Param("phone") String phone);

}
