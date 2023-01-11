// package: proto.greet
// file: src/grpc/proto/greetings.proto

import * as src_grpc_proto_greetings_pb from "./greetings_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ChatServiceSendMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_grpc_proto_greetings_pb.Message;
  readonly responseType: typeof src_grpc_proto_greetings_pb.Response;
};

export class ChatService {
  static readonly serviceName: string;
  static readonly SendMessage: ChatServiceSendMessage;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ChatServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sendMessage(
    requestMessage: src_grpc_proto_greetings_pb.Message,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_grpc_proto_greetings_pb.Response|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: src_grpc_proto_greetings_pb.Message,
    callback: (error: ServiceError|null, responseMessage: src_grpc_proto_greetings_pb.Response|null) => void
  ): UnaryResponse;
}

