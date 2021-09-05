import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/students";
import { ListParams, ListResponse } from "interface";
import Student from "interface/student";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { studentActions } from "./studentSlice";



function* fetchStudentList(action: PayloadAction<ListParams>){
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAllStudent, action.payload)

        yield put(studentActions.fetchStudentListSuccess(response))
    } catch (error) {
        console.log(error)
        yield put(studentActions.fetchStudentListFailure())
    }
}



function* handleSearchDebounce(action: PayloadAction<ListParams>){
    yield put(studentActions.setFilter(action.payload))
}

export default function* studentSaga(){
    yield takeLatest(studentActions.fetchStudentList, fetchStudentList)

    yield debounce(500,studentActions.setFilterWithDebounce.type,handleSearchDebounce)
}