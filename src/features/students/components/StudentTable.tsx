import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Student from 'interface/student';
import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Theme } from '@material-ui/core';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { capitalizeString, getMarkColor } from 'utils';
import { City } from 'interface';




export interface StudentTableProps{
    studentList: Student[]
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
    cityMap: {
      [key: string]: City
    }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    edit:{
      marginRight: theme.spacing(1)
    }
  })
)


export default function StudentTable({studentList,onEdit,onRemove,cityMap}:StudentTableProps) {

  const classes = useStyles()

  const [open,setOpen] = useState(false)
  const [selectedStudent,setSelectedStudent] = useState<Student>()

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student)
    setOpen(true)
  }

  const handleConfirmStudent = (student: Student) => {
    onRemove?.(student)
    setOpen(false)
  }

  
  return (
      <>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='left'>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Mark</TableCell>
                <TableCell>City</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {studentList.map((student,index) => (
                <TableRow key={student.id}>
                  <TableCell width={310}>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    {capitalizeString(student.gender)}
                  </TableCell>
                  <TableCell>
                    <Box color={getMarkColor(student.mark)}
                    fontWeight='bold'
                    >
                      {student.mark}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {cityMap[student.city]?.name}
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      color='primary'
                      onClick={() =>onEdit?.(student)}
                      className = {classes.edit}
                      size='small'
                    >Edit</Button>
                    <Button 
                      size='small'
                      color='secondary'
                      onClick={() =>handleRemoveClick(student)}
                    > Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* DIALOG  */}
        
        <Dialog 
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={open}
        >
           <DialogTitle 
            id="alert-dialog-title">  
              {"Remove student ?"}
           </DialogTitle>
           <DialogContent>
              <DialogContentText          id="alert-dialog-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quidem laudantium facilis totam omnis quasi tempore provident? Dolorem, at autem repudiandae eum distinctio dolore veniam, et, ducimus nemo harum saepe.
                Học Sinh 
                {selectedStudent?.name}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button 
              onClick={()=>setOpen(false)}  
              color="primary"
              variant='outlined'
              >
                Disagree
              </Button>
              <Button onClick={()=>handleConfirmStudent(selectedStudent as Student)} color="secondary" autoFocus
              variant='contained'
              >
                Agree
              </Button>
            </DialogActions>
        </Dialog>
      </>
  );
}
