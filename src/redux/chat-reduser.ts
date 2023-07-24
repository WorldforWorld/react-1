import { Dispatch } from "redux";
import { FormAction } from "redux-form";
import { ChatMessageType, StatusType, chatAPI } from "../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/chat/MESSAGES_RECEVIED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    case "SN/chat/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};
export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: "SN/chat/MESSAGES_RECEVIED",
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: "SN/chat/STATUS_CHANGED",
      payload: { status },
    } as const),
};
let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = messages => {
      dispatch(actions.messagesReceived(messages));
    };
  }

  return _newMessagesHandler;
};
export const startMessagesListening = (): ThunkType => async dispatch => {
  chatAPI.start();
  chatAPI.subscribe("messages-received", newMessagesHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", newMessagesHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async dispatch => {
  chatAPI.subscribe("messages-received", newMessagesHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", newMessagesHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async dispatch => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
