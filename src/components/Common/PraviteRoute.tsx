import { Redirect, Route, RouteProps } from "react-router-dom";


export interface IPrivateRouteProps{

}

export function PrivateRoute(props: RouteProps){
    const igLogger = Boolean(localStorage.getItem('access_token'))
    if (!igLogger) return  <Redirect to='/login' />
    return (
        <Route  {...props} />
    )
}