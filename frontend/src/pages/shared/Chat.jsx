import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import socket, { connectSocket } from "../../services/socket.service";
import { getAuthToken } from "../../utils/authStorage";

const Chat = () => {
  const { jobId } = useParams();
  const [messages, setMessages] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      toast.error("Please login to use chat");
      return undefined;
    }

    const handleConnect = () => socket.emit("join_job_chat", jobId);
    const handleReady = (chat) => {
      setMessages(chat.messages || []);
      setParticipant(chat.participant);
      setLoading(false);
    };
    const handleNewMessage = (newMessage) => {
      setMessages((currentMessages) => [...currentMessages, newMessage]);
    };
    const handleChatError = (error) => {
      setLoading(false);
      toast.error(error);
    };
    const handleConnectError = (error) => {
      setLoading(false);
      toast.error(error.message || "Unable to connect to chat");
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on("chat_ready", handleReady);
    socket.on("new_message", handleNewMessage);
    socket.on("chat_error", handleChatError);
    connectSocket(token);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("chat_ready", handleReady);
      socket.off("new_message", handleNewMessage);
      socket.off("chat_error", handleChatError);
      socket.emit("leave_job_chat", jobId);
      socket.disconnect();
    };
  }, [jobId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || !socket.connected) return;

    socket.emit("send_message", { jobId, message: text });
    setMessage("");
  };

  if (loading) return <div className="p-6 text-gray-500">Loading chat...</div>;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {participant?.fullName
            ? `Chat with ${participant.fullName}`
            : "Job chat"}
        </h1>
        <p className="mt-1 text-gray-500">
          Messages for this accepted job only.
        </p>
      </div>

      <div className="flex min-h-105 flex-col rounded-xl bg-white shadow-sm">
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.length === 0 && (
            <p className="text-center text-gray-400">No messages yet.</p>
          )}
          {messages.map((item) => (
            <div
              key={item.id}
              className={`flex ${
                item.senderId === participant?.id
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <p className="max-w-[80%] rounded-2xl bg-blue-600 px-4 py-2 text-white">
                {item.message}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 border-t p-4">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write a message..."
            className="min-w-0 flex-1 rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
            maxLength={2000}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
