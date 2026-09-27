import RunQueryButton from "./RunQueryButton";
import ResultPanel from "../results/ResultPanel";

function ChatMessage({
  message,
  onRunQuery,
  runningQueryId,
}) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`message-row ${
        isUser
          ? "user-message"
          : "ai-message"
      }`}
    >

      <div className="avatar">
        {isUser ? "You" : "AI"}
      </div>

      <div className="message-content">

        <div className="message-name">
          {isUser
            ? "You"
            : "DataPilot"}
        </div>

        <div className="message-text">
          {message.content}
        </div>

        {/* Query ready */}

        {message.status === "ready" && (

          <RunQueryButton
            queryId={message.queryId}
            onRunQuery={onRunQuery}
            isRunning={
              runningQueryId ===
              message.queryId
            }
          />

        )}

        {/* Query running */}

        {message.status === "running" && (

          <div className="query-running">
            <span className="spinner"></span>

            Running your query...
          </div>

        )}

        {/* Query completed */}

        {message.status === "completed" && (

          <ResultPanel
            result={message.result}
          />

        )}

        {/* Error */}

        {message.status === "error" && (

          <div className="error-box">
            <strong>
              Something went wrong
            </strong>

            <br />

            {message.error}
          </div>

        )}

      </div>

    </div>
  );
}

export default ChatMessage;