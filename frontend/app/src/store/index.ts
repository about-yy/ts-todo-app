import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore, Commit } from 'vuex';
import * as ActionTypes from "./ActionTypes";
import * as MutationTypes from './mutationTypes';

type State = { token: string };
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        token: ''
    },
    mutations: {
        [MutationTypes.SET_ACCESS_TOKEN](state, token: string) {
            state.token = token;
        }
    },
    actions: {
        async [ActionTypes.SET_ACCESS_TOKEN](context: { commit: Commit }, token: string) {
            context.commit(MutationTypes.SET_ACCESS_TOKEN, token);
        }
    }
});
export const useStore = () => {
    return baseUseStore(key);
}