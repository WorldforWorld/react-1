import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
describe("Profile status component", () => {
  test("status from should be in the state", () => {
    const component = create(<ProfileStatus status="uhahahahhahaha" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("uhahahahhahaha");
  });
  test("after creation <span> should be displayed", () => {
    const component = create(<ProfileStatus status="uhahahahhahaha" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull(1);
  });
  test("after creation <input> should be displayed", () => {
    const component = create(<ProfileStatus status="uhahahahhahaha" />);
    const root = component.root;
    let input = root.findByType("input");
    expect(input).toBeNull(1);
  });
  test("after creation <span> should contains correct status", () => {
    const component = create(<ProfileStatus status="uhahahahhahaha" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("uhahahahhahaha");
  });
});
