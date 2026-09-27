import AppLayout from "../components/layout/AppLayout";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import { useChat } from "../context/ChatContext";

function ChatPage() {
  const {
    messages,
    sendMessage,
    runQuery,
    isGenerating,
    runningQueryId,
  } = useChat();

  return (
    <AppLayout
      sidebar={<Sidebar />}
      header={<Header />}
    >
      <div className="chat-page">

        <ChatWindow
          messages={messages}
          onRunQuery={runQuery}
          runningQueryId={runningQueryId}
          isGenerating={isGenerating}
        />

        <ChatInput
          onSend={sendMessage}
          disabled={isGenerating}
        />

      </div>
    </AppLayout>
  );
}

export default ChatPage;