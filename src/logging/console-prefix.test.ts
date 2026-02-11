import { describe, expect, it } from "vitest";
import { stripRedundantSubsystemPrefixForConsole } from "../logging.js";

describe("stripRedundantSubsystemPrefixForConsole", () => {
  it("drops '<subsystem>:' prefix", () => {
    expect(stripRedundantSubsystemPrefixForConsole("telegram: hello", "telegram")).toBe("hello");
  });

  it("drops '<Subsystem>:' prefix case-insensitively", () => {
    expect(stripRedundantSubsystemPrefixForConsole("Telegram: hello", "telegram")).toBe("hello");
  });

  it("drops '<subsystem> ' prefix", () => {
    expect(stripRedundantSubsystemPrefixForConsole("telegram gateway: closed", "telegram")).toBe(
      "gateway: closed",
    );
  });

  it("drops '[subsystem]' prefix", () => {
    expect(
      stripRedundantSubsystemPrefixForConsole("[telegram] connection stalled", "telegram"),
    ).toBe("connection stalled");
  });

  it("keeps messages that do not start with the subsystem", () => {
    expect(stripRedundantSubsystemPrefixForConsole("telegramant: hello", "telegram")).toBe(
      "telegramant: hello",
    );
  });
});
