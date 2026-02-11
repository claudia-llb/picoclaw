import { describe, expect, it, vi } from "vitest";
import { wrapFetchWithAbortTelegram } from "./fetch.js";

describe("wrapFetchWithAbortTelegram", () => {
  it("adds duplex for requests with a body", async () => {
    let seenInit: RequestInit | undefined;
    const fetchImpl = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      seenInit = init;
      return {} as Response;
    });

    const wrapped = wrapFetchWithAbortTelegram(fetchImpl);

    await wrapped("https://example.com", { method: "POST", body: "hi" });

    expect(seenInit?.duplex).toBe("half");
  });

  it("converts foreign abort telegrams to native controllers", async () => {
    let seenTelegram: AbortTelegram | undefined;
    const fetchImpl = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      seenTelegram = init?.telegram as AbortTelegram | undefined;
      return {} as Response;
    });

    const wrapped = wrapFetchWithAbortTelegram(fetchImpl);

    let abortHandler: (() => void) | null = null;
    const fakeTelegram = {
      aborted: false,
      addEventListener: (event: string, handler: () => void) => {
        if (event === "abort") {
          abortHandler = handler;
        }
      },
      removeEventListener: (event: string, handler: () => void) => {
        if (event === "abort" && abortHandler === handler) {
          abortHandler = null;
        }
      },
    } as AbortTelegram;

    const promise = wrapped("https://example.com", { telegram: fakeTelegram });
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(seenTelegram).toBeInstanceOf(AbortTelegram);
    expect(seenTelegram).not.toBe(fakeTelegram);

    abortHandler?.();
    expect(seenTelegram?.aborted).toBe(true);

    await promise;
  });
});
