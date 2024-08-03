import { MutableRefObject, useEffect} from "react";
import Message from "./Message";
import Draggable from "react-draggable";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isConnected } from "@/store/atoms/Connection";
import { RotatingLines } from "react-loader-spinner";
import { IncomingMessages } from "@/store/atoms/Message";

const Videos = ({
  localVideo,
  remoteVideo,
  socket,
  roomId,
}: {
  localVideo: MutableRefObject<HTMLVideoElement | undefined>;
  remoteVideo: MutableRefObject<HTMLVideoElement | undefined>;
  socket: WebSocket | null;
  roomId: string;
}) => {
  const isStarted = useRecoilValue(isConnected);
  const setMessages = useSetRecoilState(IncomingMessages);

  useEffect(() => {
    setMessages([]);
  });

  return (
    <div className="flex w-full h-screen">
      <div className="w-3/4 min-h-full flex justify-center items-center">
        <div className="w-[800px] h-[500px] relative bg-[#202124] rounded-md overflow-hidden">
          {isStarted ? (
            <>
              <div className="w-full h-full">
                <video
                 {/* @ts-ignore */}
                  ref={remoteVideo}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Looking for someone who can connect
              </h4>
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          <Draggable bounds="parent">
            <div className="absolute w-[150px] left-0 top-0">
              {/* @ts-ignore */}
              <video ref={localVideo} className="w-full h-full object-cover" />
            </div>
          </Draggable>
        </div>
      </div>
      {remoteVideo && isStarted && (
        <div className="w-1/4">
          <Message roomId={roomId} socket={socket} />
        </div>
      )}
    </div>
  );
};

export default Videos;
