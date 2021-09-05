import {ListParams, ListResponse} from "interface/common";
import Student from "interface/student";
import axiosClient from "./axiosClient";

const studentApi = {
    getAllStudent(params: ListParams): Promise<ListResponse<Student>>{
        const url = '/students'
        return axiosClient.get(url, { params })
    },
    remove(id: string) : Promise<any>{
        const url = `/students/${id}`
        return axiosClient.delete(url)
    },
    add(data:Student) : Promise<Student>{
        const url = `/students`
        return axiosClient.post(url, data)
    },
    update(data:Student,id:string) : Promise<Student>{
        const url = `/students/${id}`
        return axiosClient.patch(url, data)
    },
    getById(id:string) : Promise<Student>{
        const url = `/students/${id}`
        return axiosClient.get(url)
    }
}

export default studentApi;