import { combineReducers } from "redux";
import { reducer as myExampleState} from "./myExampleState";
  

const rootReducer = combineReducers({
    myExampleState : myExampleState

})


export {rootReducer};