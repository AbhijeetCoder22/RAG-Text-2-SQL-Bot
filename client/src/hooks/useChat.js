import { useState } from "react";

import {
  generateQuery,
  executeQuery
} from "../services/chatApi";

export function useChat() {

  const [messages, setMessages] = useState([]);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [runningQueryId, setRunningQueryId] =
    useState(null);

  const [conversationId] =
    useState(() =>
      crypto.randomUUID()
    );


  const sendMessage = async (message) => {

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message
    };

    setMessages(prev => [
      ...prev,
      userMessage
    ]);

    setIsGenerating(true);

    try {

      const response =
        await generateQuery(
          message,
          conversationId
        );

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",

        content:
          response.message ||
          "I generated a query for your request.",

        queryId: response.query_id,

        status: "ready"
      };

      setMessages(prev => [
        ...prev,
        aiMessage
      ]);

    } catch (error) {

      const errorMessage = {
        id: crypto.randomUUID(),

        role: "assistant",

        content:
          "I couldn't generate a query for that request.",

        status: "error",

        error: error.message
      };

      setMessages(prev => [
        ...prev,
        errorMessage
      ]);

    } finally {

      setIsGenerating(false);

    }
  };


  const runQuery = async (queryId) => {

    setRunningQueryId(queryId);

    try {

      const result =
        await executeQuery(queryId);

      setMessages(prev =>
        prev.map(message => {

          if (
            message.queryId === queryId
          ) {

            return {
              ...message,

              status: "completed",

              result
            };

          }

          return message;

        })
      );

    } catch (error) {

      setMessages(prev =>
        prev.map(message => {

          if (
            message.queryId === queryId
          ) {

            return {
              ...message,

              status: "error",

              error: error.message
            };

          }

          return message;

        })
      );

    } finally {

      setRunningQueryId(null);

    }
  };


  return {
    messages,
    sendMessage,
    runQuery,
    isGenerating,
    runningQueryId
  };
}