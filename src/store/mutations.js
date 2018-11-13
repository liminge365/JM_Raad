import {ADD, READNUM} from './mutationsTypes';

export default {
  [ADD](state, num) {
    state.totalNumber = num
  },
  [READNUM](state, readnum) {
    state.Readnum = readnum
  }
}
