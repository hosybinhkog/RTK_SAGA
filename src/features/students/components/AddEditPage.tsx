import { Box, makeStyles, Theme, Typography ,createStyles } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import studentApi from 'api/students'
import Student from 'interface/student'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StudentForm from './StudentForm'

interface AddEditPageProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            
        },
        back:{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.2rem',
            fontWeight: 'bold'
        },
        link:{
            textDecoration:'none',
        },
        icon: {
            fontSize: '2rem',
            fontWeight: 'bold'
        },
        title:{
            fontSize: '2rem',
            textTransform:'capitalize',
            fontWeight: 600
        }
    })
)

function AddEditPage(props: AddEditPageProps) {
    const classes = useStyles()

    const {studentId} = useParams<{studentId: string}>();
    const isEdit = Boolean(studentId)

    const [student,setStudent] = useState<Student>()

    useEffect(() => {
        if(!studentId) return
        (async () => {
            try {
                const response : Student = await studentApi.getById(studentId)
                setStudent(response)
                console.log(response)
            } catch (error) {
                console.log('fail to call api student edit ', error)
            }
        })();
    }, [studentId])

    const initialValue: Student = {
        name: '',
        age:'',
        mark:'',
        city:'',
        gender: 'male',
        ...student
    } as Student;

    const handleStudentFormSubmit = (formValues: Student) => {

    }

    return (
       <Box>
           <Link to='/admin/students' className={classes.link}>
               <Typography color='primary' variant='caption' className={classes.back}>
                    <ChevronLeft className={classes.icon}/>
                    Back
               </Typography>
           </Link>
           <Typography variant='h4' className={classes.title}>
                {isEdit ? 'Update student' : 'Add new students'}       
            </Typography>
            {(!isEdit || Boolean(student)) && (
                <Box mt={3}>
                    <StudentForm initialValue={initialValue}
                        onSubmit={handleStudentFormSubmit}
                    />
                </Box>
            )}
       </Box>
    )
}

export default AddEditPage
