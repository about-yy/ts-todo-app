/**
 * タスク管理ページのテスト
 */
import { render } from "@testing-library/vue";
import TaskPageVue from "../src/views/TaskPage.vue";
describe("タスクページのテスト", async () => {
  /**
   * 画面表示 タスクを取得できない場合
   */
  describe("タスクを取得できない場合の画面表示", async () => {
    it("タイトルが表示されること", async () => {
      const screen = render(TaskPageVue);
      expect(screen.getByRole("heading")).toHaveTextContent(
        "タスク一覧 | TS TODO APP"
      );
    });
    it("タスクがない場合のメッセージが表示されること", async () => {
      const screen = render(TaskPageVue);
      expect(screen.getByRole("task_list")).toHaveTextContent(
        "登録されているタスクはありません"
      );
    });
    it("新規タスク作成欄が表示されること", async () => {
      const screen = render(TaskPageVue);
      expect(screen.getByRole("task_add_form")).toBeTruthy();
    });
    it("カレンダーアイコンが表示されること", async () => {
      const screen = render(TaskPageVue);
      expect(screen.getByTestId("task_add_form-icon")).toBeTruthy();
    });
    it("送信ボタンが表示されること", async () => {
      const screen = render(TaskPageVue);
      expect(screen.getByText("送信", { selector: "button" })).toBeTruthy();
    });
    it("タスク一覧が表示されること", async () => {
      const screen = render(TaskPageVue);
      expect(screen.getByRole("task_list")).toBeTruthy();
    });
  });

  /**
   * 画面表示のテスト タスクを取得できる場合
   */
  describe("タスクを取得できる場合の画面表示", async () => {
    it("それぞれのタスクが表示されていること");
    it("それぞれのタスクにカレンダーアイコンが表示されていること");
    it("それぞれのタスクにチェックボックスが表示されていること");
  });

  /**
   * 機能テスト
   */
  describe("タスク作成", async () => {
    it("期限を設定せずにタスクを作成できること");
    it("作成したタスクが画面に表示されること");
    it("期限を設定したタスクを作成できること");
    it("タスク名を入力すると、カレンダーアイコンが表示されること");
    it("設定した期限のタスクが表示されていること");
  });

  describe("タスク完了", async () => {
    it("タスクを完了できること");
    it("完了したタスクが表示されなくなること");
  });

  describe("タスク期限設定", async () => {
    it("タスクに期限を設定できること");
    it("タスクに設定されている期限が、設定された内容で更新されること");
  });
});
