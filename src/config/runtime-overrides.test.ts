import { beforeEach, describe, expect, it } from "vitest";
import type { OpenClawConfig } from "./types.js";
import {
  applyConfigOverrides,
  getConfigOverrides,
  resetConfigOverrides,
  setConfigOverride,
  unsetConfigOverride,
} from "./runtime-overrides.js";

describe("runtime overrides", () => {
  beforeEach(() => {
    resetConfigOverrides();
  });

  it("sets and applies nested overrides", () => {
    const cfg = {
      messages: { responsePrefix: "[openclaw]" },
    } as OpenClawConfig;
    setConfigOverride("messages.responsePrefix", "[debug]");
    const next = applyConfigOverrides(cfg);
    expect(next.messages?.responsePrefix).toBe("[debug]");
  });

  it("merges object overrides without clobbering siblings", () => {
    const cfg = {
      channels: { telegram: { dmPolicy: "pairing", allowFrom: ["+1"] } },
    } as OpenClawConfig;
    setConfigOverride("channels.telegram.dmPolicy", "open");
    const next = applyConfigOverrides(cfg);
    expect(next.channels?.telegram?.dmPolicy).toBe("open");
    expect(next.channels?.telegram?.allowFrom).toEqual(["+1"]);
  });

  it("unsets overrides and prunes empty branches", () => {
    setConfigOverride("channels.telegram.dmPolicy", "open");
    const removed = unsetConfigOverride("channels.telegram.dmPolicy");
    expect(removed.ok).toBe(true);
    expect(removed.removed).toBe(true);
    expect(Object.keys(getConfigOverrides()).length).toBe(0);
  });

  it("rejects prototype pollution paths", () => {
    const attempts = ["__proto__.polluted", "constructor.polluted", "prototype.polluted"];
    for (const path of attempts) {
      const result = setConfigOverride(path, true);
      expect(result.ok).toBe(false);
      expect(Object.keys(getConfigOverrides()).length).toBe(0);
    }
  });
});
