import { InferActionsTypes } from "./redux-store";

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

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: "SN/DIALOGS/SEND-MESSAGE",
      newMessageBody,
    } as const),
};

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "SN/DIALOGS/SEND-MESSAGE":
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

export default dialogsReducer;

export type initialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;
