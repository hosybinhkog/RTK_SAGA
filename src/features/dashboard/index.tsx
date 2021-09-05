import { createStyles, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react'
import StatisticItem from './components/StatisticItem';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestStudentList, selectLowestStudentList, selectRankingByCityList } from './dashboardSlice';
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
import { Theme } from '@material-ui/core/styles/createTheme';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            position: 'relative',
            paddingTop: theme.spacing(1)
        },
        loading:{
            position: 'absolute',
            top: theme.spacing(-1),
            width: 'calc(100% - 8px)'
        }
    })
)


function Dashboard() {
     const loading = useAppSelector(selectDashboardLoading)

    const statistics = useAppSelector(selectDashboardStatistics)

    const highestStudentList = useAppSelector(selectHighestStudentList)

    const lowestStudentList = useAppSelector(selectLowestStudentList)

    const rankingByCityList = useAppSelector(selectRankingByCityList)

    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(dashboardActions.fetchData())
    },[dispatch]);
   
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading}/>}
            <Grid container>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem icon={
                        <PregnantWomanIcon fontSize="large" 
                        color='primary'
                        />
                    }
                    label="female"
                    value={statistics.femaleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem icon={
                        <PregnantWomanIcon fontSize="large" 
                        color='primary'
                        />
                    }
                    label="male"
                    value={statistics.maleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem icon={
                        <PregnantWomanIcon fontSize="large" 
                        color='primary'
                        />
                    }
                    label="mark >=8 "
                    value={statistics.highMarkCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem icon={
                        <PregnantWomanIcon fontSize="large" 
                        color='primary'
                        />
                    }
                    label="mark<=5"
                    value={statistics.lowMarkCount}
                    />
                </Grid>
            </Grid>

            <Box mt={4}>
                    <Typography variant="h4">
                        All students
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with highest mark">
                                <StudentRankingList studentList={highestStudentList} />
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with highest mark">
                                <StudentRankingList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
            </Box>

            <Box mt={4}>
                    <Typography variant="h4">
                        Ranking by city list
                    </Typography>
                    <Grid container spacing={3}>
                        {rankingByCityList.map((item,index)=>(
                            <Grid item xs={12} md={6} lg={3} key={item.cityId}>
                                <Widget title={item.cityId}>
                                    <StudentRankingList studentList={item.rankingList} />
                                </Widget>
                            </Grid>
                        ))}
                    </Grid>
            </Box>
        </Box>
    )
}


export default Dashboard

