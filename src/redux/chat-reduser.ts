import { Dispatch } from "redux";
import { FormAction } from "redux-form";
import { ChatMessageType, StatusType, chatAPI } from "../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { v1 } from "uuid";
type ChatMessageCustomType = ChatMessageType & { id: string };
const initialState = {
  messages: [] as ChatMessageCustomType[],
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
        messages: [
          ...state.messages,
          ...action.payload.messages.map(m => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 100),
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = status => {
      dispatch(actions.statusChanged(status));
    };
  }

  return _statusChangedHandler;
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
  chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async dispatch => {
  chatAPI.subscribe("messages-received", newMessagesHandlerCreator(dispatch));
  chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
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
