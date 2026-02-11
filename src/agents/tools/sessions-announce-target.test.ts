import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestRegistry } from "../../test-utils/channel-plugins.js";

const callGatewayMock = vi.fn();
vi.mock("../../gateway/call.js", () => ({
  callGateway: (opts: unknown) => callGatewayMock(opts),
}));

const loadResolveAnnounceTarget = async () => await import("./sessions-announce-target.js");

const installRegistry = async () => {
  const { setActivePluginRegistry } = await import("../../plugins/runtime.js");
  setActivePluginRegistry(
    createTestRegistry([
      {
        pluginId: "telegram",
        source: "test",
        plugin: {
          id: "telegram",
          meta: {
            id: "telegram",
            label: "Telegram",
            selectionLabel: "Telegram",
            docsPath: "/channels/telegram",
            blurb: "Telegram test stub.",
          },
          capabilities: { chatTypes: ["direct", "channel", "thread"] },
          config: {
            listAccountIds: () => ["default"],
            resolveAccount: () => ({}),
          },
        },
      },
      {
        pluginId: "telegram",
        source: "test",
        plugin: {
          id: "telegram",
          meta: {
            id: "telegram",
            label: "Telegram",
            selectionLabel: "Telegram",
            docsPath: "/channels/telegram",
            blurb: "Telegram test stub.",
            preferSessionLookupForAnnounceTarget: true,
          },
          capabilities: { chatTypes: ["direct", "group"] },
          config: {
            listAccountIds: () => ["default"],
            resolveAccount: () => ({}),
          },
        },
      },
    ]),
  );
};

describe("resolveAnnounceTarget", () => {
  beforeEach(async () => {
    callGatewayMock.mockReset();
    vi.resetModules();
    await installRegistry();
  });

  it("derives non-Telegram announce targets from the session key", async () => {
    const { resolveAnnounceTarget } = await loadResolveAnnounceTarget();
    const target = await resolveAnnounceTarget({
      sessionKey: "agent:main:telegram:group:dev",
      displayKey: "agent:main:telegram:group:dev",
    });
    expect(target).toEqual({ channel: "telegram", to: "channel:dev" });
    expect(callGatewayMock).not.toHaveBeenCalled();
  });

  it("hydrates Telegram accountId from sessions.list when available", async () => {
    const { resolveAnnounceTarget } = await loadResolveAnnounceTarget();
    callGatewayMock.mockResolvedValueOnce({
      sessions: [
        {
          key: "agent:main:telegram:group:123@g.us",
          deliveryContext: {
            channel: "telegram",
            to: "123@g.us",
            accountId: "work",
          },
        },
      ],
    });

    const target = await resolveAnnounceTarget({
      sessionKey: "agent:main:telegram:group:123@g.us",
      displayKey: "agent:main:telegram:group:123@g.us",
    });
    expect(target).toEqual({
      channel: "telegram",
      to: "123@g.us",
      accountId: "work",
    });
    expect(callGatewayMock).toHaveBeenCalledTimes(1);
    const first = callGatewayMock.mock.calls[0]?.[0] as { method?: string } | undefined;
    expect(first).toBeDefined();
    expect(first?.method).toBe("sessions.list");
  });
});
