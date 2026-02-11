import { describe, expect, it } from "vitest";
import { resolveNativeSkillsEnabled } from "./commands.js";

describe("resolveNativeSkillsEnabled", () => {
  it("uses provider defaults for auto", () => {
    expect(
      resolveNativeSkillsEnabled({
        providerId: "telegram",
        globalSetting: "auto",
      }),
    ).toBe(true);
    expect(
      resolveNativeSkillsEnabled({
        providerId: "telegram",
        globalSetting: "auto",
      }),
    ).toBe(true);
    expect(
      resolveNativeSkillsEnabled({
        providerId: "telegram",
        globalSetting: "auto",
      }),
    ).toBe(false);
    expect(
      resolveNativeSkillsEnabled({
        providerId: "telegram",
        globalSetting: "auto",
      }),
    ).toBe(false);
  });

  it("honors explicit provider settings", () => {
    expect(
      resolveNativeSkillsEnabled({
        providerId: "telegram",
        providerSetting: true,
        globalSetting: "auto",
      }),
    ).toBe(true);
    expect(
      resolveNativeSkillsEnabled({
        providerId: "telegram",
        providerSetting: false,
        globalSetting: true,
      }),
    ).toBe(false);
  });
});
