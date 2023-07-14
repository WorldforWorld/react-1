const SEND_MESSAGE = "SEND-MESSAGE";

type DialogType = {
  id: number;
  name: string;
};

type MessageType = {
  id: number;
  message: string;
};

const initialState = {
  dialogs: [
    { id: 1, name: "Dmitri" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Victor" },
    { id: 6, name: "Valera" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your me?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ] as Array<MessageType>,
};
export type initialStateType = typeof initialState;
const dialogsReducer = (
  state = initialState,
  action: any
): initialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      const message = action.newMessageBody;
      const id = state.messages.length + 1;
      return {
        ...state,
        messages: [...state.messages, { id, message }],
      };
    default:
      return state;
  }
};

type SendMessageCreatorActionType = {
  type: typeof SEND_MESSAGE;
  newMessageBody: string;
};

export const sendMessageCreator = (
  newMessageBody: string
): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
