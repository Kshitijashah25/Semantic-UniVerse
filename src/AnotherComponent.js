import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  './AnotherComponent.css';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';

function AnotherComponent({ option }) {
  const [data, setData] = useState({ courses: [] ,students: [] , faculties: []});

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.post('http://localhost:3030/univ_all_combined/query', null, {
        headers: {},
        params: {
          query: `PREFIX table: <http://www.semanticweb.org/budcoded/ontologies/university/all#>
          SELECT DISTINCT ?course 
          WHERE {
            ?course table:Enrolled_By ?object .
            ?object table:Admitted_By ?univ .
             FILTER(regex(str(?univ), "${option}", "i")) 
          }`
        }
    });
    
        const response2 = await axios.post('http://localhost:3030/univ_all_combined/query', null, {
            headers: {},
            params: {
              query: `PREFIX table: <http://www.semanticweb.org/budcoded/ontologies/university/all#>
              SELECT DISTINCT ?student 
              WHERE {
                ?student table:Admitted_By ?object .
                 FILTER(regex(str(?object), "${option}", "i")) 
              }`
            }
        });
            const response3 = await axios.post('http://localhost:3030/univ_all_combined/query', null, {
            headers: {},
            params: {
              query: `PREFIX table: <http://www.semanticweb.org/budcoded/ontologies/university/all#>
              SELECT DISTINCT ?faculty
              WHERE {
                ?faculty table:Hired_By ?object .
                 FILTER(regex(str(?object), "${option}", "i")) 
              }`
            }
      });
    
      const courses = response1.data.results.bindings.map(row => row.course.value.split("#")[1]);
      const students = response2.data.results.bindings.map(row => row.student.value.split("#")[1]);
      const faculties = response3.data.results.bindings.map(row => row.faculty.value.split("#")[1]);

      setData({ courses, faculties, students });
    //setData({courses})
    }
    fetchData();
  }, [option]);


return (
	<div className="grid-container">
	<h2>University: {option}</h2>
		<div className="table-container">
			<TableContainer component={Paper} variant="outlined">
			<Table aria-label="course-table">
				<TableHead>
					<TableRow>
						<TableCell className="table-head">Courses</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
				{data.courses.map((course, index) => (
					<TableRow key={index}>
					<TableCell>{course}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
			</TableContainer>
		</div>
	
		<div className="table-container">
			<TableContainer component={Paper} variant="outlined">
			<Table aria-label="course-table">
				<TableHead>
				<TableRow>
					<TableCell className="table-head">Faculties</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{data.faculties.map((faculty, index) => (
					<TableRow key={index}>
					<TableCell>{faculty}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
			</TableContainer>
		</div>
	
		<div className="table-container">
			<TableContainer component={Paper} variant="outlined">
			<Table aria-label="course-table">
				<TableHead>
				<TableRow>
					<TableCell className="table-head">Students</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{data.students.map((student, index) => (
					<TableRow key={index}>
					<TableCell>{student}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
			</TableContainer>
		</div>
	</div>
  );
}

export default AnotherComponent;
