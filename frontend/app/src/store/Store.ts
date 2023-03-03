import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore } from 'vuex';
type State = {};
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({});
export const useStore = () => {
    return baseUseStore(key);
}