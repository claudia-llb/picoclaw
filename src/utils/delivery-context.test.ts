import { describe, expect, it } from "vitest";
import {
  deliveryContextKey,
  deliveryContextFromSession,
  mergeDeliveryContext,
  normalizeDeliveryContext,
  normalizeSessionDeliveryFields,
} from "./delivery-context.js";

describe("delivery context helpers", () => {
  it("normalizes channel/to/accountId and drops empty contexts", () => {
    expect(
      normalizeDeliveryContext({
        channel: " telegram ",
        to: " +1555 ",
        accountId: " acct-1 ",
      }),
    ).toEqual({
      channel: "telegram",
      to: "+1555",
      accountId: "acct-1",
    });

    expect(normalizeDeliveryContext({ channel: "  " })).toBeUndefined();
  });

  it("merges primary values over fallback", () => {
    const merged = mergeDeliveryContext(
      { channel: "telegram", to: "channel:abc" },
      { channel: "telegram", to: "channel:def", accountId: "acct" },
    );

    expect(merged).toEqual({
      channel: "telegram",
      to: "channel:abc",
      accountId: "acct",
    });
  });

  it("builds stable keys only when channel and to are present", () => {
    expect(deliveryContextKey({ channel: "telegram", to: "+1555" })).toBe("telegram|+1555||");
    expect(deliveryContextKey({ channel: "telegram" })).toBeUndefined();
    expect(deliveryContextKey({ channel: "telegram", to: "+1555", accountId: "acct-1" })).toBe(
      "telegram|+1555|acct-1|",
    );
    expect(deliveryContextKey({ channel: "telegram", to: "channel:C1", threadId: "123.456" })).toBe(
      "telegram|channel:C1||123.456",
    );
  });

  it("derives delivery context from a session entry", () => {
    expect(
      deliveryContextFromSession({
        channel: "webchat",
        lastChannel: " telegram ",
        lastTo: " +1777 ",
        lastAccountId: " acct-9 ",
      }),
    ).toEqual({
      channel: "telegram",
      to: "+1777",
      accountId: "acct-9",
    });

    expect(
      deliveryContextFromSession({
        channel: "telegram",
        lastTo: " 123 ",
        lastThreadId: " 999 ",
      }),
    ).toEqual({
      channel: "telegram",
      to: "123",
      accountId: undefined,
      threadId: "999",
    });

    expect(
      deliveryContextFromSession({
        channel: "telegram",
        lastTo: " -1001 ",
        origin: { threadId: 42 },
      }),
    ).toEqual({
      channel: "telegram",
      to: "-1001",
      accountId: undefined,
      threadId: 42,
    });

    expect(
      deliveryContextFromSession({
        channel: "telegram",
        lastTo: " -1001 ",
        deliveryContext: { threadId: " 777 " },
        origin: { threadId: 42 },
      }),
    ).toEqual({
      channel: "telegram",
      to: "-1001",
      accountId: undefined,
      threadId: "777",
    });
  });

  it("normalizes delivery fields and mirrors them on session entries", () => {
    const normalized = normalizeSessionDeliveryFields({
      deliveryContext: {
        channel: " Telegram ",
        to: " channel:1 ",
        accountId: " acct-2 ",
        threadId: " 444 ",
      },
      lastChannel: " telegram ",
      lastTo: " +1555 ",
    });

    expect(normalized.deliveryContext).toEqual({
      channel: "telegram",
      to: "+1555",
      accountId: "acct-2",
      threadId: "444",
    });
    expect(normalized.lastChannel).toBe("telegram");
    expect(normalized.lastTo).toBe("+1555");
    expect(normalized.lastAccountId).toBe("acct-2");
    expect(normalized.lastThreadId).toBe("444");
  });
});
