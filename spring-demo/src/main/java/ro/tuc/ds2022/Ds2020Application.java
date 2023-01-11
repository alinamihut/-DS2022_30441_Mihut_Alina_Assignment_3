package ro.tuc.ds2022;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import lombok.var;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.validation.annotation.Validated;
import ro.tuc.ds2022.services.GreetServiceImpl;

import java.io.IOException;
import java.util.TimeZone;

@SpringBootApplication
@Validated
@EnableScheduling
public class Ds2020Application extends SpringBootServletInitializer {

    public static final String EXCHANGE_NAME = "appExchange";
    public static final String QUEUE_GENERIC_NAME = "appGenericQueue";
    public static final String ROUTING_KEY = "messages.key";
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Ds2020Application.class);
    }

    public static void main(String[] args) throws IOException, InterruptedException {

		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        SpringApplication.run(Ds2020Application.class, args);

        final int PORT = 9090;

        // Create a new server to listen on port 9090
        Server server = ServerBuilder.forPort(PORT)
                .addService(new GreetServiceImpl())
                .build();

        // Start the server
        server.start();

        // Server threads are running in the background.
        System.out.println("Server started...");
        // Don't exit the main thread. Wait until server is terminated.
        server.awaitTermination();
    }
        /*
    @Bean
    public void startServer() throws IOException, InterruptedException {

    }


         */
    @Bean
    public TopicExchange appExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue appQueueGeneric() {
        return new Queue(QUEUE_GENERIC_NAME);
    }

    @Bean
    public Binding declareBindingGeneric() {
        return BindingBuilder.bind(appQueueGeneric()).to(appExchange()).with(ROUTING_KEY);
    }

    @Bean
    public MessageConverter converter(){
        return new Jackson2JsonMessageConverter();
    }


    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
        final var rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());
        /*
        com.rabbitmq.client.ConnectionFactory factory = new com.rabbitmq.client.ConnectionFactory();
        factory.setHost("rabbitmq-integration");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        factory.setVirtualHost("/");

         */
        return rabbitTemplate;
    }
}

