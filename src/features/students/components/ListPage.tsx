import { Button, createStyles, Theme } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react'
import { selectStudentFilter, selectStudentList, selectStudentPagination, studentActions } from '../studentSlice';
import StudentTable from './StudentTable';
import { Pagination } from '@material-ui/lab';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import StudentFilters from './StudentFilters';
import { ListParams } from 'interface/common';
import Student from 'interface/student';
import studentApi from 'api/students';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        titleContainer: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing(4)
        },
        pagination:{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    })
)



export default function ListPage() {
    const match = useRouteMatch()
    const history = useHistory()
    const studentList = useAppSelector(selectStudentList)
    const pagination = useAppSelector(selectStudentPagination)
    const filter = useAppSelector(selectStudentFilter)
    const cityMap = useAppSelector(selectCityMap)
    const cityList = useAppSelector(selectCityList)

    const handleChangePagination = (event:React.ChangeEvent<unknown>,page:number) =>{
        dispatch(studentActions.setFilter({
            ...filter,
            _page: page,
        }))
    }

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(
            studentActions.fetchStudentList(filter)
        )
    }, [dispatch,filter])

    const classes = useStyles()

    const handleSearchChange = (newFilter: ListParams) => {
        console.log(newFilter)
        dispatch(studentActions.setFilterWithDebounce(newFilter))
    }

    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter))
    }

    const handleRemoveStudent = async(student: Student) => {
        console.log(student)
        try {
            await studentApi.remove(student?.id || '')
            dispatch(studentActions.setFilter({...filter}))
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeEdit = (student: Student) => {
        history.push(`${match.url}/${student.id}`)
    }


    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Typography variant="h4">
                    Students 
                </Typography>
                <Link to={`${match.url}/add`}>
                    <Button variant="contained"
                    color="primary">
                        Add new students
                    </Button>
                </Link>    
            </Box>

            <Box mt={4} mb={4}>
                <StudentFilters filter={filter} cityList={cityList} 
                onSearchChange={handleSearchChange} 
                onChange={handleFilterChange}    
                />
            </Box>

            <StudentTable studentList={studentList}
            cityMap={cityMap}
            onRemove={handleRemoveStudent}
            onEdit={handleChangeEdit}
            />
            <Box mt={2}>
                <Pagination 
                className={classes.pagination}
                color='primary'
                count={Math.ceil(pagination._totalRows/pagination._limit)} page={pagination._page}
                onChange={handleChangePagination}
            />
            </Box>
        </Box>
    )
}
