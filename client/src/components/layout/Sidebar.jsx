import { useChat } from "../../context/ChatContext";

function Sidebar() {
  const {
    newChat,
    conversations,
    selectConversation,
  } = useChat();

  return (
    <div className="sidebar-container">

      {/* Logo */}

      <div className="logo">
        <div className="logo-icon">
          ◈
        </div>

        <span>DataPilot</span>
      </div>

      {/* New Chat */}

      <button
        className="new-chat-button"
        onClick={newChat}
      >
        <span>＋</span>
        New Chat
      </button>

      {/* Conversations */}

      <div className="conversation-section">

        <div className="section-title">
          RECENT CHATS
        </div>

        {conversations.length === 0 ? (

          <div className="no-conversations">
            No conversations yet
          </div>

        ) : (

          conversations.map((conversation) => (

            <button
              key={conversation.id}
              className="conversation"
              onClick={() =>
                selectConversation(
                  conversation.id
                )
              }
            >
              {conversation.title}
            </button>

          ))

        )}

      </div>

      {/* Bottom */}

      <div className="sidebar-bottom">

        <button className="sidebar-item">
          ⚙ Settings
        </button>

        <button className="sidebar-item">
          ? Help
        </button>

      </div>

    </div>
  );
}

export default Sidebar;