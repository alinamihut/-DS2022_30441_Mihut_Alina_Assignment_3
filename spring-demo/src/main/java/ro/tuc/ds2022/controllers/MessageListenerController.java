package ro.tuc.ds2022.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import ro.tuc.ds2022.services.messagelistener.CustomMessageListener;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeoutException;

@RestController
@CrossOrigin
public class MessageListenerController {


    @Autowired
    private final CustomMessageListener customMessageListener;

    public MessageListenerController(CustomMessageListener customMessageListener) {
        this.customMessageListener = customMessageListener;
    }

    @Autowired
    public void startListening() throws IOException, TimeoutException, NoSuchAlgorithmException, KeyManagementException, URISyntaxException {
        customMessageListener.receiveMessage();
    }
}
