import cityApi from "api/cityApi";
import studentApi from "api/students";
import { City, ListResponse} from "interface";
import Student from "interface/student";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardActions, IRankingByCity } from "./dashboardSlice";


function* fetchStatistics(){
    const responseList:Array<ListResponse<Student>>
     = yield all([
        call(studentApi.getAllStudent,{
            _page: 1,
            _limit: 1,
            gender: 'male',
        }),
        call(studentApi.getAllStudent,{
            _page: 1,
            _limit: 1,
            gender: 'female',
        }),
        call(studentApi.getAllStudent,{
            _page: 1,
            _limit: 1,
            mark_gte: 8
        }),
        call(studentApi.getAllStudent,{
            _page: 1,
            _limit: 1,
            mark_lte: 5
        }),
    ])

    const statisticsList = responseList.map(x=>x.pagination._totalRows);
    const [maleCount, femaleCount,highMarkCount, lowMarkCount] = statisticsList
    yield put(
        dashboardActions.setStatistics({
            maleCount,
            femaleCount,
            highMarkCount,
            lowMarkCount,
        })
    )
}

function* fetchHighestStudentList(){
    const {data}:ListResponse<Student> = yield call(studentApi.getAllStudent,{
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc'
    })

    yield put(dashboardActions.setHighestStudentList(data))
}

function* fetchLowestStudentList(){
    const {data}:ListResponse<Student> = yield call(studentApi.getAllStudent,{
        _page:1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc'
    })

    yield put(dashboardActions.setLowestStudentList(data))
}

function* fetchRankingByCityList(){
    const {data }:ListResponse<City> = yield call(cityApi.getAll)

    const callList = data.map(x=>call(studentApi.getAllStudent,{
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc',
        city: x.code
    }))

    const responseList:Array<ListResponse<Student>>=yield all(callList)

    const rankingByCityList: Array<IRankingByCity>= responseList.map((x,index) => ({
        cityId: data[index].code,
        rankingList: x.data
    }))
    yield put(dashboardActions.setRankingByCityList(rankingByCityList))
}   

function* fetchDashboardData(){
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingByCityList)
        ])
        yield put(dashboardActions.fetchDataSuccess())
    } catch (error) {
        console.log(error)
        yield put(dashboardActions.fetchDataFailure())
    }
}

export default function* dashboardSaga(){
    yield takeLatest(dashboardActions.fetchData.type,fetchDashboardData)
}