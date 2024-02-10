import {takeEvery} from 'redux-saga/effects'
import { DEC_COUNT, GET_COUNT, INC_COUNT, decrementCountSaga, getCountSaga,  incrementCountSaga } from '../features/counterSlice/counterSlice'

export function* sagasCount(){
	yield takeEvery(GET_COUNT,getCountSaga)
  yield takeEvery(DEC_COUNT,decrementCountSaga)
  yield takeEvery(INC_COUNT,incrementCountSaga)
}


