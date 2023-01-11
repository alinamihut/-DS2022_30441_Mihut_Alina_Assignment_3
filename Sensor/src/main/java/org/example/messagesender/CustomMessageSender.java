package org.example.messagesender;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.example.SensorSimulatorApplication;
import org.example.entities.Measurement;
import org.example.file_reader.DeviceIdReader;
import org.example.file_reader.SensorFileReader;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalTime;
import java.util.concurrent.TimeoutException;

@Service
public class CustomMessageSender {

    private static final Logger log = LoggerFactory.getLogger(CustomMessageSender.class);

    @Autowired
    private final RabbitTemplate rabbitTemplate;

    @Autowired
    private SensorFileReader sensorFileReader;

    @Autowired
    private DeviceIdReader deviceIdReader;

    public CustomMessageSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Scheduled(fixedDelay = 60000L)
    public void sendMessage() throws IOException, NoSuchAlgorithmException, KeyManagementException, URISyntaxException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri("amqps://bvrgvpfi:MLiwOqBVgayv_7m7u_0OEAclGqBdvrCQ@goose.rmq2.cloudamqp.com/bvrgvpfi");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        channel.queueDeclare("rabbitmq_queue", false, false, false, null);

        LocalTime timestamp = LocalTime.now();
        Integer deviceId = deviceIdReader.readDeviceId();
        Double measuredValue = sensorFileReader.readFromFile();

        Measurement measurement = new Measurement(timestamp, deviceId, measuredValue);
        JSONObject obj = new JSONObject();
        obj.put("timestamp", LocalTime.now().toString());
        obj.put("device_id",deviceId);
        obj.put("measurement_value", measuredValue);

        ObjectMapper ow = new ObjectMapper();
        //ow.registerModule(new JavaTimeModule());
       // String json = ow.writeValueAsString(measurement);
        //String json = ow.writeValueAsString(obj);
        log.info("Sending message...");
        log.info(obj.toString());
        channel.basicPublish("", "rabbitmq_queue", false, null, obj.toJSONString().getBytes());
       // rabbitTemplate.convertAndSend(SensorSimulatorApplication.EXCHANGE_NAME,SensorSimulatorApplication.ROUTING_KEY, json);
    }

}