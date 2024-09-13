import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Message from "./components/Message";
import MessageInput from "./components/MessageInput";

import { ChatGroq } from "@langchain/groq";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";

import Lottie from "react-lottie";
import * as loadingAnimation from "./animations/chat-loading.json";
import logo from "./assets/logo.jpeg";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("mixtral-8x7b-32768");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    new ChatGroq({
      model: "mixtral-8x7b-32768",
      temperature: 0,
      apiKey: import.meta.env.VITE_GROQ_API_KEY,
    })
  );
  const [chatHistory, setChatHistory] = useState([
    new SystemMessage({
      content: "You give concise and short answers.",
    }),
  ]);

  // To auto-scroll to the bottom when a new message is added
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (prompt) => {
    try {
      // const response = await selectedModel.stream([
      //   ...chatHistory,
      //   new HumanMessage({ content: prompt }),
      // ]);
      // setMessages((prevMessages) => {
      //   return [...prevMessages, { text: "", user: "AI" }];
      // });
      // for await (const chunk of response) {
      //   setMessages((prevMessages) => {
      //     const lastMessageIndex = prevMessages.length - 1;
      //     const updatedMessages = [...prevMessages];
      //     updatedMessages[lastMessageIndex].text += chunk.content;
      //     return updatedMessages;
      //   });
      // }
      const response = await selectedModel.invoke([
        ...chatHistory,
        new HumanMessage({ content: prompt }),
      ]);

      setMessages((prevMessages) => {
        return [...prevMessages, { text: response.content, user: "AI" }];
      });
      setChatHistory((prevChatHistory) => {
        const firstChat = prevChatHistory[0]; // Keep the first chat
        const updatedHistory = [...prevChatHistory.slice(1), response]; // Add the new response and exclude the first one temporarily
        return [firstChat, ...updatedHistory.slice(-10)]; // Keep the first chat and the last 10 responses
      });

      return { text: prompt, user: "AI" };
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      setLoading(true);
      setMessages((prevMessages) => {
        // Add user message to the messages array only once
        const newMessages = [...prevMessages];
        newMessages.push({ text: input, user: "You" });
        return newMessages;
      });
      await getAIResponse(input);
      setInput(""); // Clear input after sending
    }
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedModel(selectedValue);
    setSelectedModel(
      new ChatGroq({
        model: selectedValue,
        temperature: 0,
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
      })
    );
  };

  return (
    <Container
      fluid
      className=" text-light h-100 d-flex flex-column pb-3 pt-3 "
      style={{ minHeight: "100vh", backgroundColor: "black" }}
    >
      <div className="h-100 d-flex justify-content-center">
        <div
          className=" d-flex justify-content-between align-items-center"
          style={{ width: "65%" }}
        >
          {/* <h1 className="w-50 mx-2">PolyChat</h1> */}
          <img src={logo} alt="logo" style={{ height: "50px" }} />
          <Form.Select
            aria-label="Modals"
            style={{ width: "max-content", marginLeft: "auto" }}
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="mixtral-8x7b-32768">Mixtral-8x7b</option>
            <option value="gemma2-9b-it">Gemma 2</option>
            <option value="llama-3.1-70b-versatile">llama-3.1-70b</option>
          </Form.Select>
        </div>
      </div>

      <Row className="d-fle mt-3">
        <Col md={{ span: 8, offset: 2 }} className="d-flex flex-column">
          {/* Chat window */}
          <Card
            className="bg-secondary text-light flex-grow-1 mb-3 mt-3"
            style={{ maxHeight: "90vh" }}
          >
            <Card.Body
              className="overflow-auto d-flex flex-column"
              style={{ minHeight: "75vh", maxHeight: "80vh" }}
            >
              {messages.map((message, index) => (
                <Message key={index} message={message} />
              ))}
              {loading && (
                <div
                  className="d-flex align-self-start bg-dark"
                  style={{ borderRadius: "10px" }}
                >
                  <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: loadingAnimation.default,
                      rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                      },
                    }}
                    height={40}
                    width={80}
                  />
                </div>
              )}
              {/* Dummy div to scroll into view */}
              <div ref={messagesEndRef} />
            </Card.Body>
          </Card>
          {/* Message input */}
          <MessageInput
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
