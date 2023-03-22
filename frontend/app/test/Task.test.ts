import { render } from "@testing-library/vue";
import TaskPageVue from "../src/views/TaskPage.vue";
describe("タスクページのテスト", async () => {
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
});
