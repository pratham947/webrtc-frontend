import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useRecoilState } from "recoil";
import { IncomingMessages } from "@/store/atoms/Message";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";

const Message = ({
  socket,
  roomId,
}: {
  socket: WebSocket | null;
  roomId: string;
}) => {
  const [text, setText] = useState("");

  const [message, setMessage] = useRecoilState(IncomingMessages);

  const messageRef = useRef<HTMLElement | null>(null);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (text.length == 0) return;
    console.log("hello");

    socket?.send(
      JSON.stringify({
        type: "send-message",
        roomId: roomId,
        message: text,
        time: new Date(),
      })
    );
    setMessage((prev) => [
      ...prev,
      {
        message: text,
        time: new Date(),
        messageType: "me",
      },
    ]);
    setText("");
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current?.scrollHeight;
    }
  }, [message]);

  return (
    <div className="relative w-full h-full overflow-auto flex flex-col">
      <div className="p-5">
        <p className="font-Montserrat text-2xl font-bold">Messages</p>
      </div>
      <div ref={messageRef} className="p-5 h-4/6 overflow-auto">
        {message.map(({ message, messageType }) => (
          <div
            className={`${
              messageType == "me"
                ? "bg-[#202124] float-right"
                : "bg-blue-800 float-left"
            } clear-both p-2 my-5 rounded-md`}
          >
            <p>{message}</p>
            {messageType == "me" && (
                <p className="text-xs item text-end">{messageType == "me" && "me"}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-5 p-3">
        <Textarea
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
          className="font-Montserrat"
          value={text}
          onKeyDown={(e) => {
            if (e.key == "Enter" && e.shiftKey == false) {
              sendMessage(e);
            }
          }}
        />
        <Button onClick={sendMessage}>
          <PaperPlaneIcon />
        </Button>
      </div>
    </div>
  );
};
export default Message;
