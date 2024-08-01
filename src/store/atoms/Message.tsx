import { atom } from "recoil";

interface Message {
  message: string;
  time: Date;
}

export const IncomingMessages = atom<Message[]>({
  key: "IncomingMessages",
  default: [],
});
