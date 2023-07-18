import profileReducer, { actions } from "./profile-reducer";

let state = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 0 },
    { id: 2, message: "It's my first post", likesCount: 165 },
  ],
  profile: null,
  status: "",
  newPostText: "",
};
it("new post shold be added", () => {
  // 1. test data
  let action = actions.addPostActionCreator("test-text");

  // 2. action
  let newState = profileReducer(state, action);

  // 3/ expectation
  expect(newState.posts.length).toBe(3);
});
it("after deleting length of messages should be decrement", () => {
  // 1. test data
  let action = actions.deletePost(1);

  // 2. action
  let newState = profileReducer(state, action);

  // 3/ expectation
  expect(newState.posts.length).toBe(2);
});
