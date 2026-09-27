import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

import { useChat } from "../../context/ChatContext";

function ChatWindow({
  messages,
  onRunQuery,
  runningQueryId,
  isGenerating,
}) {
  const { sendMessage } = useChat();

  const suggestions = [
    "Show me the top 10 customers by revenue",
    "Show monthly sales for 2026",
    "Which region has the highest revenue?",
  ];

  const handleSuggestion = (question) => {
    sendMessage(question);
  };

  return (
    <div className="chat-window">

      {messages.length === 0 && (

        <div className="welcome">

          <div className="welcome-icon">
            ◈
          </div>

          <h1>
            How can I help with your data?
          </h1>

          <p>
            Ask questions about your database
            using natural language.
          </p>

          <div className="suggestions">

            {suggestions.map((question) => (

              <button
                key={question}
                onClick={() =>
                  handleSuggestion(question)
                }
              >
                {question}
              </button>

            ))}

          </div>

        </div>
      )}

      {messages.map((message) => (

        <ChatMessage
          key={message.id}
          message={message}
          onRunQuery={onRunQuery}
          runningQueryId={runningQueryId}
        />

      ))}

      {isGenerating && (
        <TypingIndicator />
      )}

    </div>
  );
}

export default ChatWindow;