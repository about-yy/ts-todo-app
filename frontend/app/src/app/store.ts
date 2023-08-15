import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore, Commit } from "vuex";
import * as ActionTypes from "./ActionTypes";
import * as MutationTypes from "./MutationTypes";

type State = { token: string };
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    token: "",
  },
  mutations: {
    [MutationTypes.SET_ACCESS_TOKEN](state, token: string) {
      state.token = token;
    },
    [MutationTypes.DELETE_ACCESS_TOKEN](state) {
      state.token = "";
    },
  },
  actions: {
    async [ActionTypes.SET_ACCESS_TOKEN](
      context: { commit: Commit },
      token: string
    ) {
      context.commit(MutationTypes.SET_ACCESS_TOKEN, token);
    },
    async [ActionTypes.DELETE_ACCESS_TOKEN](
      context: { commit: Commit },
    ) {
      context.commit(MutationTypes.DELETE_ACCESS_TOKEN);
    }
  },
});
export const useStore = () => {
  return baseUseStore(key);
};
