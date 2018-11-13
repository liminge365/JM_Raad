import {ADD,READNUM} from './mutationsTypes.js'

export default {
  actionsAdd({commit}, num) {
    commit(ADD, num)
  },
  actionsReadnum({commit}, readnum) {
    // console.log(readnum)
    commit(READNUM, readnum)
  }
}
