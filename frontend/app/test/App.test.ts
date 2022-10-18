import AppVue from "../src/App.vue";
import {describe, expect, test} from "vitest";
import { render } from "@testing-library/vue";

describe('sample test ', async ()=>{
    test('Hello World', async ()=>{
        const application = render(AppVue);
        application.getByText("Hello World");
    })
})