import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import ScrollToBottom from "react-scroll-to-bottom";
import {FaMessage} from "react-icons/fa6";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket("ws://127.0.0.1:8000/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        {text: message, from: "bot"},
      ]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      setWs(null);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!ws || !inputMessage.trim()) return;
    ws.send(inputMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      {text: inputMessage, from: "user"},
    ]);
    setInputMessage("");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();

      console.log(inputMessage);
      sendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-10 ">
      <div className="w-[600px] border rounded-md">
        <div
          onClick={toggleChatbot}
          className="bg-white text-gray-900 text-xl font-bold py-5 px-3 border-b flex justify-between gap-2 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FaMessage size={20} />
            <span>Chat with AI Analytics</span>
          </div>

          <div className="">
            {isOpen ? <IoIosArrowDown size={20} /> : <IoIosArrowUp size={20} />}
          </div>
        </div>
        {isOpen && (
          <div className="bg-white text-gray-800 shadow-lg h-[600px] flex flex-col justify-between">
            <ScrollToBottom className="h-full overflow-y-scroll text-2xl py-5 px-3">
              <div>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.from === "bot"
                        ? "bg-gray-200 w-2/3 mr-auto border rounded-md rounded-r-xl p-2 my-2"
                        : "text-white bg-blue-600 w-2/3 ml-auto border rounded-md rounded-l-xl p-2 my-2"
                    }
                  >
                    {message.from === "bot" ? (
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    ) : (
                      message.text
                    )}
                  </div>
                ))}
              </div>
            </ScrollToBottom>

            <div className="border-t">
              <div className="relative m-4 flex-1 overflow-hidden rounded-lg">
                <TextareaAutosize
                  rows={2}
                  maxRows={4}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                  autoFocus
                  placeholder="Write a message..."
                  className=" w-full resize-none  border-none outline-none bg-zinc-100 py-2 px-3 text-gray-900 text-xl"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
