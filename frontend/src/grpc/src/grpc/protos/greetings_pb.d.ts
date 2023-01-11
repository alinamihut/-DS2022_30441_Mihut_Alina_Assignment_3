// package: proto.greet
// file: src/grpc/protos/greetings.proto

import * as jspb from "google-protobuf";

export class Message extends jspb.Message {
  getTo(): string;
  setTo(value: string): void;

  getFrom(): string;
  setFrom(value: string): void;

  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    to: string,
    from: string,
    text: string,
  }
}

export class ResponseFromServer extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResponseFromServer.AsObject;
  static toObject(includeInstance: boolean, msg: ResponseFromServer): ResponseFromServer.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResponseFromServer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResponseFromServer;
  static deserializeBinaryFromReader(message: ResponseFromServer, reader: jspb.BinaryReader): ResponseFromServer;
}

export namespace ResponseFromServer {
  export type AsObject = {
    success: boolean,
    error: string,
    message?: Message.AsObject,
  }
}

