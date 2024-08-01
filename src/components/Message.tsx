import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRecoilValue } from "recoil";
import { IncomingMessages } from "@/store/atoms/Message";
import moment from "moment";

const Message = ({
  socket,
  roomId,
}: {
  socket: WebSocket | null;
  roomId: string;
}) => {
  const [message, setMessage] = useState("");
  const SenderMessages = useRecoilValue(IncomingMessages);
  console.log(SenderMessages);

  const sendMessage = () => {
    socket?.send(
      JSON.stringify({
        type: "send-message",
        roomId: roomId,
        message: message,
        time : new Date()
      })
    );
    setMessage("");
  };

  return (
    <div>
      <div>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="message"
        />
        <Button onClick={() => sendMessage()}>Send Messaege</Button>
      </div>
      <div>
        <p>Incoming Messages</p>
        {
          SenderMessages.map(({message,time})=>(
            <div>
              <p>{message}</p>
              <p>{moment(time).utc().format("HH:mm")}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Message;
