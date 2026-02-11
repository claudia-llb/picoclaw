import { describe, expect, it } from "vitest";
import {
  buildOutboundDeliveryJson,
  formatGatewaySummary,
  formatOutboundDeliverySummary,
} from "./format.js";

describe("formatOutboundDeliverySummary", () => {
  it("falls back when result is missing", () => {
    expect(formatOutboundDeliverySummary("telegram")).toBe(
      "✅ Sent via Telegram. Message ID: unknown",
    );
    expect(formatOutboundDeliverySummary("telegram")).toBe(
      "✅ Sent via Telegram. Message ID: unknown",
    );
  });

  it("adds chat or channel details", () => {
    expect(
      formatOutboundDeliverySummary("telegram", {
        channel: "telegram",
        messageId: "m1",
        chatId: "c1",
      }),
    ).toBe("✅ Sent via Telegram. Message ID: m1 (chat c1)");

    expect(
      formatOutboundDeliverySummary("telegram", {
        channel: "telegram",
        messageId: "d1",
        channelId: "chan",
      }),
    ).toBe("✅ Sent via Telegram. Message ID: d1 (channel chan)");
  });
});

describe("buildOutboundDeliveryJson", () => {
  it("builds direct delivery payloads", () => {
    expect(
      buildOutboundDeliveryJson({
        channel: "telegram",
        to: "123",
        result: { channel: "telegram", messageId: "m1", chatId: "c1" },
        mediaUrl: "https://example.com/a.png",
      }),
    ).toEqual({
      channel: "telegram",
      via: "direct",
      to: "123",
      messageId: "m1",
      mediaUrl: "https://example.com/a.png",
      chatId: "c1",
    });
  });

  it("supports telegram metadata when present", () => {
    expect(
      buildOutboundDeliveryJson({
        channel: "telegram",
        to: "+1",
        result: { channel: "telegram", messageId: "w1", toJid: "jid" },
      }),
    ).toEqual({
      channel: "telegram",
      via: "direct",
      to: "+1",
      messageId: "w1",
      mediaUrl: null,
      toJid: "jid",
    });
  });

  it("keeps timestamp for telegram", () => {
    expect(
      buildOutboundDeliveryJson({
        channel: "telegram",
        to: "+1",
        result: { channel: "telegram", messageId: "s1", timestamp: 123 },
      }),
    ).toEqual({
      channel: "telegram",
      via: "direct",
      to: "+1",
      messageId: "s1",
      mediaUrl: null,
      timestamp: 123,
    });
  });
});

describe("formatGatewaySummary", () => {
  it("formats gateway summaries with channel", () => {
    expect(formatGatewaySummary({ channel: "telegram", messageId: "m1" })).toBe(
      "✅ Sent via gateway (telegram). Message ID: m1",
    );
  });

  it("supports custom actions", () => {
    expect(
      formatGatewaySummary({
        action: "Poll sent",
        channel: "telegram",
        messageId: "p1",
      }),
    ).toBe("✅ Poll sent via gateway (telegram). Message ID: p1");
  });
});
