function TypingIndicator() {
  return (
    <div className="typing">

      <div className="typing-avatar">
        AI
      </div>

      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <span>
        Generating query...
      </span>

    </div>
  );
}

export default TypingIndicator;