import { describe, expect, it } from "vitest";
import { resolveChannelConfigWrites } from "./config-writes.js";

describe("resolveChannelConfigWrites", () => {
  it("defaults to allow when unset", () => {
    const cfg = {};
    expect(resolveChannelConfigWrites({ cfg, channelId: "telegram" })).toBe(true);
  });

  it("blocks when channel config disables writes", () => {
    const cfg = { channels: { telegram: { configWrites: false } } };
    expect(resolveChannelConfigWrites({ cfg, channelId: "telegram" })).toBe(false);
  });

  it("account override wins over channel default", () => {
    const cfg = {
      channels: {
        telegram: {
          configWrites: true,
          accounts: {
            work: { configWrites: false },
          },
        },
      },
    };
    expect(resolveChannelConfigWrites({ cfg, channelId: "telegram", accountId: "work" })).toBe(
      false,
    );
  });

  it("matches account ids case-insensitively", () => {
    const cfg = {
      channels: {
        telegram: {
          configWrites: true,
          accounts: {
            Work: { configWrites: false },
          },
        },
      },
    };
    expect(resolveChannelConfigWrites({ cfg, channelId: "telegram", accountId: "work" })).toBe(
      false,
    );
  });
});
