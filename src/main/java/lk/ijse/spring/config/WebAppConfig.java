package lk.ijse.spring.config;

import lk.ijse.spring.advisor.AppWideExceptionHandler;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * @author : Kavithma Thushal
 * @project : Spring-POS
 **/
@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = {AppWideExceptionHandler.class}, basePackages = "lk.ijse.spring.controller")
public class WebAppConfig {
}