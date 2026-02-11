import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { normalizeLegacyConfigValues } from "./doctor-legacy-config.js";

describe("normalizeLegacyConfigValues", () => {
  let previousOauthDir: string | undefined;
  let tempOauthDir: string | undefined;

  const writeCreds = (dir: string) => {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "creds.json"), JSON.stringify({ me: {} }));
  };

  beforeEach(() => {
    previousOauthDir = process.env.OPENCLAW_OAUTH_DIR;
    tempOauthDir = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-oauth-"));
    process.env.OPENCLAW_OAUTH_DIR = tempOauthDir;
  });

  afterEach(() => {
    if (previousOauthDir === undefined) {
      delete process.env.OPENCLAW_OAUTH_DIR;
    } else {
      process.env.OPENCLAW_OAUTH_DIR = previousOauthDir;
    }
    if (tempOauthDir) {
      fs.rmSync(tempOauthDir, { recursive: true, force: true });
      tempOauthDir = undefined;
    }
  });

  it("does not add telegram config when missing and no auth exists", () => {
    const res = normalizeLegacyConfigValues({
      messages: { ackReaction: "👀" },
    });

    expect(res.config.channels?.telegram).toBeUndefined();
    expect(res.changes).toEqual([]);
  });

  it("copies legacy ack reaction when telegram config exists", () => {
    const res = normalizeLegacyConfigValues({
      messages: { ackReaction: "👀", ackReactionScope: "group-mentions" },
      channels: { telegram: {} },
    });

    expect(res.config.channels?.telegram?.ackReaction).toEqual({
      emoji: "👀",
      direct: false,
      group: "mentions",
    });
    expect(res.changes).toEqual([
      "Copied messages.ackReaction → channels.telegram.ackReaction (scope: group-mentions).",
    ]);
  });

  it("does not add telegram config when only auth exists (issue #900)", () => {
    const credsDir = path.join(tempOauthDir ?? "", "telegram", "default");
    writeCreds(credsDir);

    const res = normalizeLegacyConfigValues({
      messages: { ackReaction: "👀", ackReactionScope: "group-mentions" },
    });

    expect(res.config.channels?.telegram).toBeUndefined();
    expect(res.changes).toEqual([]);
  });

  it("does not add telegram config when only legacy auth exists (issue #900)", () => {
    const credsPath = path.join(tempOauthDir ?? "", "creds.json");
    fs.writeFileSync(credsPath, JSON.stringify({ me: {} }));

    const res = normalizeLegacyConfigValues({
      messages: { ackReaction: "👀", ackReactionScope: "group-mentions" },
    });

    expect(res.config.channels?.telegram).toBeUndefined();
    expect(res.changes).toEqual([]);
  });

  it("does not add telegram config when only non-default auth exists (issue #900)", () => {
    const credsDir = path.join(tempOauthDir ?? "", "telegram", "work");
    writeCreds(credsDir);

    const res = normalizeLegacyConfigValues({
      messages: { ackReaction: "👀", ackReactionScope: "group-mentions" },
    });

    expect(res.config.channels?.telegram).toBeUndefined();
    expect(res.changes).toEqual([]);
  });

  it("copies legacy ack reaction when authDir override exists", () => {
    const customDir = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-wa-auth-"));
    try {
      writeCreds(customDir);

      const res = normalizeLegacyConfigValues({
        messages: { ackReaction: "👀", ackReactionScope: "group-mentions" },
        channels: { telegram: { accounts: { work: { authDir: customDir } } } },
      });

      expect(res.config.channels?.telegram?.ackReaction).toEqual({
        emoji: "👀",
        direct: false,
        group: "mentions",
      });
    } finally {
      fs.rmSync(customDir, { recursive: true, force: true });
    }
  });
});
