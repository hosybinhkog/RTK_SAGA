import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Student from 'interface/student';



export interface StudentRankingListProps{
    studentList: Student[]
}


export default function StudentRankingList({studentList}:StudentRankingListProps) {


  return (
    <TableContainer >
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Stt</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student,index) => (
            <TableRow key={student.id}>
              <TableCell align="center">
                {index+1}
              </TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="right">{student.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
