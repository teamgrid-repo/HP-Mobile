import { ValueOf } from "ts-essentials";
import * as globalActions from "./global/global.actions";
import * as categoryActions from "./category/category.actions";
import * as authActions from "./auth/auth.actions";
import * as providerActions from "./provider/provider.actions";
import * as quizActions from "./quiz/quiz.actions";
import * as mapActions from "./map/map.actions";
import * as messagesActions from "./messages/messages.actions";

const ALL_ACTIONS = {
  ...globalActions,
  ...categoryActions,
  ...authActions,
  ...providerActions,
  ...quizActions,
  ...mapActions,
  ...messagesActions,
};

// eslint-disable-next-line no-unused-vars
type FunctionType = (...args: any[]) => any;
type ActionCreatorsMap = { [actionCreator: string]: FunctionType };

type ActionsUnion<A extends ActionCreatorsMap> = ReturnType<ValueOf<A>>;

export type RootAction = ActionsUnion<typeof ALL_ACTIONS> | any;
