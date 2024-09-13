import React from "react";
import { Form, Button } from "react-bootstrap";

const MessageInput = ({ input, setInput, handleSendMessage }) => {
  return (
    <Form
      className="d-flex"
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
    >
      <Form.Control
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="me-2"
      />
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default MessageInput;
