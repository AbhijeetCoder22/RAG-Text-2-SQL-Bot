import { useState } from "react";

function ChatInput({ onSend, disabled }) {

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const message = value.trim();

    if (!message || disabled) {
      return;
    }

    onSend(message);

    setValue("");
  };

  return (
    <div className="chat-input-container">

      <form
        className="chat-input-wrapper"
        onSubmit={handleSubmit}
      >

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything about your data..."
          disabled={disabled}
          rows={1}
        />

        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="send-button"
        >
          ➤
        </button>

      </form>

      <div className="input-footer">
        AI-generated queries are validated before execution.
      </div>

    </div>
  );
}

export default ChatInput;