// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: greetings.proto

package proto.greet;

public interface ResponseOrBuilder extends
    // @@protoc_insertion_point(interface_extends:proto.greet.Response)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>bool success = 1;</code>
   * @return The success.
   */
  boolean getSuccess();

  /**
   * <code>string error = 2;</code>
   * @return The error.
   */
  java.lang.String getError();
  /**
   * <code>string error = 2;</code>
   * @return The bytes for error.
   */
  com.google.protobuf.ByteString
      getErrorBytes();
}
