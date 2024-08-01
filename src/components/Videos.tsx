import React, { MutableRefObject } from "react";
import Message from "./Message";

const Videos = ({
  localVideo,
  remoteVideo,
  socket,
  roomId
}: {
  localVideo: MutableRefObject<HTMLVideoElement | undefined>;
  remoteVideo: MutableRefObject<HTMLVideoElement | undefined>;
  socket: WebSocket | null;
  roomId : string
}) => {
  return (
    <div>
      <div>
        <video ref={remoteVideo} />
      </div>
      <div>
        <Message roomId={roomId} socket={socket}/>
      </div>
    </div>
  );
};

export default Videos;