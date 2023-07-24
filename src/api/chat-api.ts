const subscribes = {
  "messages-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;
type EventsNamesType = "messages-received" | "status-changed";

const closeHandler = () => {
  setTimeout(createChannel, 3000);
};
const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribes["messages-received"].forEach(s => s(newMessages));
};
const cleanUp = () => {
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
};
function createChannel() {
  cleanUp();
  ws?.close();
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
}
export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribes["messages-received"] = [];
    subscribes["status-changed"] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    //@ts-ignore
    subscribes[eventName].push(callback);
    return () => {
      //@ts-ignore
      subscribes[eventName] = subscribes[eventName].filter(s => s !== callback);
    };
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
  ) {
    //@ts-ignore
    subscribes[eventName] = subscribes[eventName].filter(s => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export type StatusType = "pending" | "ready";
