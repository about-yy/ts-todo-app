import { describe, test, vi } from "vitest";
/** テスト対象 */
const getLastSplit = (url: string) => {
  return url.split("/").at(url.split("/").length - 1);
};
const StringWrapper = {
  getLastSplit,
};

/** テスト対象終了 */

const vitestUrl = "https://vitest.dev/api/vi.html";

const mockGetLastSplit = (url: string) => {
  const mockUrl = "lastOfSplit";
  return mockUrl;
};

describe("モックサンプル", async () => {
  test("サンプルテスト", async () => {
    expect(StringWrapper.getLastSplit(vitestUrl)).toBe("vi.html");
  });
  test("spy sample", async () => {
    const spy = vi.spyOn(StringWrapper, "getLastSplit");
    expect(StringWrapper.getLastSplit(vitestUrl)).toBe("vi.html");
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockImplementation(mockGetLastSplit);
    expect(StringWrapper.getLastSplit(vitestUrl)).toBe("lastOfSplit");
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test("mock サンプル", async () => {
    const mock = vi.fn().mockImplementation(getLastSplit);
    expect(mock(vitestUrl)).toBe("vi.html");
    // mock(vitestUrl);
    expect(mock).toHaveBeenCalledTimes(1);
    mock.mockImplementation(mockGetLastSplit);
    expect(mock("test")).toBe("lastOfSplit");
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
