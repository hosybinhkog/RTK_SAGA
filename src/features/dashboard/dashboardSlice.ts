import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import Student from "interface/student";

export interface IDashboardStatistics{
    maleCount: number 
    femaleCount: number 
    highMarkCount: number 
    lowMarkCount: number 
}

export interface IRankingByCity{
    cityId: string
    rankingList: Student[]
}
export interface IDashboardState{
    loading: boolean,
    statistics: IDashboardStatistics
    highestStudentList: Student[]
    lowestStudentList: Student[]
    rankingByCityList: IRankingByCity[]
}

const initialState :IDashboardState ={
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0
    },
    highestStudentList: [],
    lowestStudentList:[],
    rankingByCityList: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers:{
        fetchData(state){
            state.loading = true;
        },
        fetchDataSuccess(state){
            state.loading = false;
        },
        fetchDataFailure(state){
            state.loading = false;
        },
        setStatistics(state,action:PayloadAction<IDashboardStatistics>){
            state.statistics = action.payload;
        },
        setHighestStudentList(state,action:PayloadAction<Student[]>){
            state.highestStudentList = action.payload;
        },
        setLowestStudentList(state,action:PayloadAction<Student[]>){
            state.lowestStudentList = action.payload;
        },
        setRankingByCityList(state,action:PayloadAction<IRankingByCity[]>){
            state.rankingByCityList = action.payload;
        }

    }
})

export const dashboardActions = dashboardSlice.actions

///selector for dashboard

export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics

export const selectDashboardLoading = (state: RootState) => state.dashboard.loading

export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList

export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList

export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList





const dashboardReducer = dashboardSlice.reducer

export default dashboardReducer;