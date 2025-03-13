package org.example.backendapi.Config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Configuration
public class DatabaseInitializer {
    private final DataSource dataSource;

    public DatabaseInitializer(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostConstruct
//    được sử dụng để gọi phương thức initializeDatabase sau khi bean câu hình (DatabaseInitializer) được khởi tạo
//    và dataSource được inject
    public void initializeDatabase() {
        try (Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, new ClassPathResource("data.sql"));
            System.out.println("Database initialized");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
