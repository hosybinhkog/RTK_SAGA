import { call, fork, put ,take } from "redux-saga/effects";
import { authActions, IPayloadLogin } from "./authSlice";
import { PayloadAction } from '@reduxjs/toolkit'
import { push } from "connected-react-router";

function* handleLogin(payload: IPayloadLogin){
    try {
        localStorage.setItem('access_token','fake_user');
        yield put(
            authActions.loginSuccess({
                id:1,
                name: 'fake_user'
            })
        )
        yield put(push('/admin'))
    } catch (error) {
        yield put(authActions.loginFailed(error.message))
        console.log(error)
    }
}

function* handleLogout(){
    try {
        localStorage.removeItem('access_token');
        yield put(push('/login'))
    } catch (error) {
        console.log(error)
    }
}

function* watchLoginFlow () {
   while(true){
       const logged = Boolean(localStorage.getItem('access_token'))
       console.log(logged)
       if(!logged){
        const action: PayloadAction<IPayloadLogin>=yield take(authActions.login.type)
        yield call(handleLogin,action.payload)
       }

       yield take(authActions.logout.type)
       yield call(handleLogout)
   }
}


export default function* authSaga(){
  yield fork(watchLoginFlow)   
}