import { describe, expect, it } from "vitest";
import { applyPluginAutoEnable } from "./plugin-auto-enable.js";

describe("applyPluginAutoEnable", () => {
  it("configures channel plugins with disabled state and updates allowlist", () => {
    const result = applyPluginAutoEnable({
      config: {
        channels: { telegram: { botToken: "x" } },
        plugins: { allow: ["telegram"] },
      },
      env: {},
    });

    expect(result.config.plugins?.entries?.telegram?.enabled).toBe(false);
    expect(result.config.plugins?.allow).toEqual(["telegram"]);
    expect(result.changes.join("\n")).toContain("Telegram configured, not enabled yet.");
  });

  it("respects explicit disable", () => {
    const result = applyPluginAutoEnable({
      config: {
        channels: { telegram: { botToken: "x" } },
        plugins: { entries: { telegram: { enabled: false } } },
      },
      env: {},
    });

    expect(result.config.plugins?.entries?.telegram?.enabled).toBe(false);
    expect(result.changes).toEqual([]);
  });

  it("configures irc as disabled when configured via env", () => {
    const result = applyPluginAutoEnable({
      config: {},
      env: {
        IRC_HOST: "irc.libera.chat",
        IRC_NICK: "openclaw-bot",
      },
    });

    expect(result.config.plugins?.entries?.irc?.enabled).toBe(false);
    expect(result.changes.join("\n")).toContain("IRC configured, not enabled yet.");
  });

  it("configures provider auth plugins as disabled when profiles exist", () => {
    const result = applyPluginAutoEnable({
      config: {
        auth: {
          profiles: {
            "google-antigravity:default": {
              provider: "google-antigravity",
              mode: "oauth",
            },
          },
        },
      },
      env: {},
    });

    expect(result.config.plugins?.entries?.["google-antigravity-auth"]?.enabled).toBe(false);
  });

  it("skips when plugins are globally disabled", () => {
    const result = applyPluginAutoEnable({
      config: {
        channels: { telegram: { botToken: "x" } },
        plugins: { enabled: false },
      },
      env: {},
    });

    expect(result.config.plugins?.entries?.telegram?.enabled).toBeUndefined();
    expect(result.changes).toEqual([]);
  });

  describe("preferOver channel prioritization", () => {
    it("prefers telegram: skips telegram auto-configure when both are configured", () => {
      const result = applyPluginAutoEnable({
        config: {
          channels: {
            telegram: { serverUrl: "http://localhost:1234", password: "x" },
          },
        },
        env: {},
      });

      expect(result.config.plugins?.entries?.telegram?.enabled).toBe(false);
      expect(result.config.plugins?.entries?.telegram?.enabled).toBeUndefined();
      expect(result.changes.join("\n")).toContain("telegram configured, not enabled yet.");
      expect(result.changes.join("\n")).not.toContain("Telegram configured, not enabled yet.");
    });

    it("keeps telegram enabled if already explicitly enabled (non-destructive)", () => {
      const result = applyPluginAutoEnable({
        config: {
          channels: {
            telegram: { serverUrl: "http://localhost:1234", password: "x" },
          },
          plugins: { entries: { telegram: { enabled: true } } },
        },
        env: {},
      });

      expect(result.config.plugins?.entries?.telegram?.enabled).toBe(false);
      expect(result.config.plugins?.entries?.telegram?.enabled).toBe(true);
    });

    it("allows telegram auto-configure when telegram is explicitly disabled", () => {
      const result = applyPluginAutoEnable({
        config: {
          channels: {
            telegram: { serverUrl: "http://localhost:1234", password: "x" },
          },
          plugins: { entries: { telegram: { enabled: false } } },
        },
        env: {},
      });

      expect(result.config.plugins?.entries?.telegram?.enabled).toBe(false);
      expect(result.config.plugins?.entries?.telegram?.enabled).toBe(false);
      expect(result.changes.join("\n")).toContain("Telegram configured, not enabled yet.");
    });

    it("allows telegram auto-configure when telegram is in deny list", () => {
      const result = applyPluginAutoEnable({
        config: {
          channels: {
            telegram: { serverUrl: "http://localhost:1234", password: "x" },
          },
          plugins: { deny: ["telegram"] },
        },
        env: {},
      });

      expect(result.config.plugins?.entries?.telegram?.enabled).toBeUndefined();
      expect(result.config.plugins?.entries?.telegram?.enabled).toBe(false);
    });

    it("configures telegram as disabled when only telegram is configured", () => {
      const result = applyPluginAutoEnable({
        config: {
          channels: { telegram: { cliPath: "/usr/local/bin/imsg" } },
        },
        env: {},
      });

      expect(result.config.plugins?.entries?.telegram?.enabled).toBe(false);
      expect(result.changes.join("\n")).toContain("Telegram configured, not enabled yet.");
    });
  });
});
