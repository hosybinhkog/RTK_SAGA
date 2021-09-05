import { City } from "interface"
import {ListResponse} from "interface/common"
import axiosClient from "./axiosClient"

const cityApi = {
    getAll(): Promise<ListResponse<City>> {
        const url='/cities'
        return axiosClient.get(url,{
            params: {
                _limit:10,
                _page:1
            }
        })
    }
}

export default cityApi