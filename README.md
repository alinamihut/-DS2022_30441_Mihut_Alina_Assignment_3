# Online_Energy_Utility_Platform

### Features:

Two types of users: Client and Administrator

- Administrator Role:
  - Perform CRUD operations on users and devices
  - Create user-device mappings


- Client Role:
  - Can view on his page all the associated devices
  - Can view the daily energy consumption for each of his associated devices as line charts


Message broker middleware component that gathers data from the smart metering devices, pre-processes the data to compute the hourly energy consumption and stores it in the database
 
 - Message Producer: Smart Metering Device Simulator module, which sends data tuples in JSON format using RabbitMQ
 - Message Consumer: processes each message and notifies asynchronously using WebSockets the client application

Chat system that allows communication between the clients and the administrator of the system developed using gRPC framework

Deployed locally in Docker containers

### Technical specifications:
- Java Spring REST backend
- React frontend
- RabbitMQ, Web Sockets
- gRPC
- Docker
