import { beforeEach, describe, expect, it } from "vitest";
import type { OpenClawConfig } from "../config/config.js";
import { prependSystemEvents } from "../auto-reply/reply/session-updates.js";
import { resolveMainSessionKey } from "../config/sessions.js";
import { enqueueSystemEvent, peekSystemEvents, resetSystemEventsForTest } from "./system-events.js";

const cfg = {} as unknown as OpenClawConfig;
const mainKey = resolveMainSessionKey(cfg);

describe("system events (session routing)", () => {
  beforeEach(() => {
    resetSystemEventsForTest();
  });

  it("does not leak session-scoped events into main", async () => {
    enqueueSystemEvent("Telegram reaction added: ✅", {
      sessionKey: "telegram:group:123",
      contextKey: "telegram:reaction:added:msg:user:✅",
    });

    expect(peekSystemEvents(mainKey)).toEqual([]);
    expect(peekSystemEvents("telegram:group:123")).toEqual(["Telegram reaction added: ✅"]);

    const main = await prependSystemEvents({
      cfg,
      sessionKey: mainKey,
      isMainSession: true,
      isNewSession: false,
      prefixedBodyBase: "hello",
    });
    expect(main).toBe("hello");
    expect(peekSystemEvents("telegram:group:123")).toEqual(["Telegram reaction added: ✅"]);

    const telegram = await prependSystemEvents({
      cfg,
      sessionKey: "telegram:group:123",
      isMainSession: false,
      isNewSession: false,
      prefixedBodyBase: "hi",
    });
    expect(telegram).toMatch(/^System: \[[^\]]+\] Telegram reaction added: ✅\n\nhi$/);
    expect(peekSystemEvents("telegram:group:123")).toEqual([]);
  });

  it("requires an explicit session key", () => {
    expect(() => enqueueSystemEvent("Node: Mac Studio", { sessionKey: " " })).toThrow("sessionKey");
  });
});
