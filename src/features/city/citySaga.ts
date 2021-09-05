import cityApi from "api/cityApi";
import { City, ListResponse } from "interface";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";



function* fetchCityList(){
    try {
        const response:ListResponse<City> = yield call(cityApi.getAll);
        yield put(cityActions.fetchCityListSuccess(response))
    } catch (error) {
        yield put(cityActions.fetchCityListFailure)
        console.error(error)
    }
}

export default function* citySaga(){
    yield takeLatest(cityActions.fetchCityList.type,fetchCityList)
}