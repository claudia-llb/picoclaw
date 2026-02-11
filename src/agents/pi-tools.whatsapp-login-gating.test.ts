import { describe, expect, it, vi } from "vitest";
import "./test-helpers/fast-coding-tools.js";
import { createOpenClawCodingTools } from "./pi-tools.js";

vi.mock("./channel-tools.js", () => {
  const stubTool = (name: string) => ({
    name,
    description: `${name} stub`,
    parameters: { type: "object", properties: {} },
    execute: vi.fn(),
  });
  return {
    listChannelAgentTools: () => [stubTool("telegram_login")],
  };
});

describe("telegram_login tool gating", () => {
  it("removes telegram_login for unauthorized senders", () => {
    const tools = createOpenClawCodingTools({ senderIsOwner: false });
    const toolNames = tools.map((tool) => tool.name);
    expect(toolNames).not.toContain("telegram_login");
  });

  it("keeps telegram_login for authorized senders", () => {
    const tools = createOpenClawCodingTools({ senderIsOwner: true });
    const toolNames = tools.map((tool) => tool.name);
    expect(toolNames).toContain("telegram_login");
  });

  it("defaults to removing telegram_login when owner status is unknown", () => {
    const tools = createOpenClawCodingTools();
    const toolNames = tools.map((tool) => tool.name);
    expect(toolNames).not.toContain("telegram_login");
  });
});
