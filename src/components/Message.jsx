import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import MarkdownEditor from "@uiw/react-markdown-editor";

// Message Component
const Message = ({ message }) => {
  const [text, setText] = useState([]);

  function splitTextWithCodeBlocks(inputText) {
    const regex = /(```[\s\S]*?```)/g; // Regex to match text between ```...```
    const parts = inputText.split(regex);

    const result = parts.map((part) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        return { code: part };
      } else {
        return { text: part.trim() };
      }
    });

    return result;
  }

  useEffect(() => {
    setText(splitTextWithCodeBlocks(message.text));
  }, [message]);

  const isUser = message.user === "You";
  return (
    <Card
      className={`mb-2 p-2 ${
        isUser ? "align-self-end bg-primary" : "align-self-start bg-dark"
      }`}
      style={{ maxWidth: "75%" }}
    >
      <Card.Text className="text-light">
        {text.map((part, index) => {
          if (part.text) {
            return <span key={index}>{part.text}</span>;
          } else {
            return (
              <MarkdownEditor.Markdown
                key={index}
                source={part.code}
                height="200px"
              />
            );
          }
        })}
        {/* <MarkdownEditor.Markdown source={message.text} height="200px" /> */}
        {/* {message.text} */}
      </Card.Text>
    </Card>
  );
};
export default Message;
