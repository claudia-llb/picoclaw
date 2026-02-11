import { describe, expect, it, vi } from "vitest";
import type { BrowserRouteContext } from "../server-context.js";

vi.mock("./index.js", () => {
  return {
    registerBrowserRoutes(app: { get: (path: string, handler: unknown) => void }) {
      app.get(
        "/slow",
        async (req: { telegram?: AbortTelegram }, res: { json: (body: unknown) => void }) => {
          const telegram = req.telegram;
          await new Promise<void>((resolve, reject) => {
            if (telegram?.aborted) {
              reject(telegram.reason ?? new Error("aborted"));
              return;
            }
            const onAbort = () => reject(telegram?.reason ?? new Error("aborted"));
            telegram?.addEventListener("abort", onAbort, { once: true });
            setTimeout(resolve, 50);
          });
          res.json({ ok: true });
        },
      );
    },
  };
});

describe("browser route dispatcher (abort)", () => {
  it("propagates AbortTelegram and lets handlers observe abort", async () => {
    const { createBrowserRouteDispatcher } = await import("./dispatcher.js");
    const dispatcher = createBrowserRouteDispatcher({} as BrowserRouteContext);

    const ctrl = new AbortController();
    const promise = dispatcher.dispatch({
      method: "GET",
      path: "/slow",
      telegram: ctrl.telegram,
    });

    ctrl.abort(new Error("timed out"));

    await expect(promise).resolves.toMatchObject({
      status: 500,
      body: { error: expect.stringContaining("timed out") },
    });
  });
});
