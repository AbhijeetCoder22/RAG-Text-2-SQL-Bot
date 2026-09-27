import { createContext, useContext, useState } from "react";

import {
  generateQuery,
  executeQuery,
} from "../services/chatApi";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const [isGenerating, setIsGenerating] = useState(false);

  const [runningQueryId, setRunningQueryId] = useState(null);

  const [conversationId, setConversationId] = useState(
    () => crypto.randomUUID()
  );

  const [conversations, setConversations] = useState([]);

  // ----------------------------------------
  // Create new conversation
  // ----------------------------------------

  const newChat = () => {
    setMessages([]);

    setConversationId(
      crypto.randomUUID()
    );

    setRunningQueryId(null);
    setIsGenerating(false);
  };

  // ----------------------------------------
  // Send message
  // ----------------------------------------

  const sendMessage = async (message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isGenerating) {
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setIsGenerating(true);

    try {
      const response = await generateQuery(
        trimmedMessage,
        conversationId
      );

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",

        content:
          response.message ||
          "Your query is ready to run.",

        queryId: response.query_id,

        status: "ready",

        createdAt: new Date().toISOString(),
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);

      // Add conversation to sidebar
      setConversations((previous) => {
        const exists = previous.some(
          (conversation) =>
            conversation.id === conversationId
        );

        if (exists) {
          return previous;
        }

        return [
          ...previous,
          {
            id: conversationId,
            title: trimmedMessage,
          },
        ];
      });

    } catch (error) {
      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant",

        content:
          "I couldn't generate a query for that request.",

        status: "error",

        error:
          error.message ||
          "Failed to generate query.",
      };

      setMessages((previous) => [
        ...previous,
        errorMessage,
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // ----------------------------------------
  // Run query
  // ----------------------------------------

  const runQuery = async (queryId) => {
    if (!queryId || runningQueryId) {
      return;
    }

    setRunningQueryId(queryId);

    setMessages((previous) =>
      previous.map((message) => {
        if (message.queryId === queryId) {
          return {
            ...message,
            status: "running",
          };
        }

        return message;
      })
    );

    try {
      const result = await executeQuery(queryId);

      setMessages((previous) =>
        previous.map((message) => {
          if (message.queryId === queryId) {
            return {
              ...message,
              status: "completed",
              result,
            };
          }

          return message;
        })
      );

    } catch (error) {
      setMessages((previous) =>
        previous.map((message) => {
          if (message.queryId === queryId) {
            return {
              ...message,
              status: "error",
              error:
                error.message ||
                "Failed to execute query.",
            };
          }

          return message;
        })
      );

    } finally {
      setRunningQueryId(null);
    }
  };

  // ----------------------------------------
  // Select conversation
  // ----------------------------------------

  const selectConversation = (id) => {
    /*
      For now we only keep conversations
      locally.

      Later we will load the conversation
      from FastAPI/database.
    */

    setConversationId(id);
  };

  const value = {
    messages,

    conversationId,

    conversations,

    isGenerating,

    runningQueryId,

    sendMessage,

    runQuery,

    newChat,

    selectConversation,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChat must be used inside ChatProvider"
    );
  }

  return context;
}