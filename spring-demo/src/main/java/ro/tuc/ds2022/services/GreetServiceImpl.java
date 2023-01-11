package ro.tuc.ds2022.services;

import io.grpc.stub.ServerCallStreamObserver;
import io.grpc.stub.StreamObserver;
import proto.greet.ChatServiceGrpc;
import proto.greet.Message;
import proto.greet.Request;
import proto.greet.ResponseFromServer;

import java.util.ArrayList;
import java.util.List;

public class GreetServiceImpl extends ChatServiceGrpc.ChatServiceImplBase {
    List<StreamObserver<Message>> observers = new ArrayList<>();
    private List<Message> messages = new ArrayList<>();
    @Override
    public void sendMessage(Message request, StreamObserver<ResponseFromServer> responseObserver) {
        String sender = request.getFrom();
        String to = request.getTo();
        String text = request.getText();
       // System.out.println(user);
        // Send the message to all connected clients

        Message message = Message.newBuilder().setFrom(sender).setTo(to).setText(text).build();


        messages.add(message);
        for (StreamObserver<Message> obs: observers){
            obs.onNext(message);
            //obs.onCompleted();
        }
        ResponseFromServer response = ResponseFromServer.newBuilder()
                .setMessage(message)
                .setSuccess(true)
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
        System.out.println(message.getText() + message.getFrom() + message.getTo());
       //

    }


    @Override
    public void receiveMessages (Request request, StreamObserver<Message> responseObserver){
        String username = request.getUsername();
        observers.add(responseObserver);

        ServerCallStreamObserver<Message> serverCallStreamObserver = (ServerCallStreamObserver<Message>) responseObserver;
        serverCallStreamObserver.setOnCancelHandler(() -> observers.remove(responseObserver)); // Add this line

        // Send any previously received messages to the new client
        for (Message message: messages) {
            if (message.getTo().equals(username)) {
                System.out.println(message.getText() +'5');
                responseObserver.onNext(message);
            }
        }
    }
    /*
    @Override
    public void greet(GreetRequest request, StreamObserver<GreetResponse> responseObserver) {
        System.out.println("You are in the greet method or the greet service");

        // we get the greeting object from the request (as defined in the proto file)
        Greeting greeting = request.getGreeting();
        String result = "Hello " + greeting.getFirstName() + greeting.getLastName();

        // build our response where the type should be GreetResponse
        GreetResponse response = GreetResponse.newBuilder()
                .setResult(result)
                .build();

        responseObserver.onNext(response);// send the response
        responseObserver.onCompleted();// complete the execution
    }

     */
}