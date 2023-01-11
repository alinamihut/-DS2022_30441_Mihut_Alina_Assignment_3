package ro.tuc.ds2022.services.messagelistener;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ro.tuc.ds2022.entities.Measurement;
import ro.tuc.ds2022.services.EnergyConsumptionService;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeoutException;

@Service
public class CustomMessageListener {

    private static final Logger log = LoggerFactory.getLogger(CustomMessageListener.class);

    private EnergyConsumptionService energyConsumptionService;

    List<Measurement> hourlyMeasurementsList = new ArrayList<>();
    public CustomMessageListener(EnergyConsumptionService energyConsumptionService) {
        this.energyConsumptionService = energyConsumptionService;
    }


    public void receiveMessage() throws IOException, TimeoutException, NoSuchAlgorithmException, KeyManagementException, URISyntaxException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri("amqps://bvrgvpfi:MLiwOqBVgayv_7m7u_0OEAclGqBdvrCQ@goose.rmq2.cloudamqp.com/bvrgvpfi");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare("rabbitmq_queue", false, false, false, null);
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            System.out.println("Received '" + message + "'");
            ObjectMapper or = new ObjectMapper();
            or.registerModule(new JavaTimeModule());
            Measurement measurement = or.readValue(message, Measurement.class);
            energyConsumptionService.insertMeasurement(measurement);
            energyConsumptionService.checkIfMeasurementExceedsMaxValue(measurement);
        };
        channel.basicConsume("rabbitmq_queue", true, deliverCallback, consumerTag -> { });
    }


}