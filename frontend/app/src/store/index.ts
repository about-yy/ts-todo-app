import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore } from 'vuex';

type State = { token: string };
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        token: ''
    }
});
export const useStore = () => {
    return baseUseStore(key);
}