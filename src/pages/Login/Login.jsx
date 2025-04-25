import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../services/firebase';
import Table from '../../components/Table/Table';

const Login = () => {

    const [employees, setEmployees] = useState([]);

    const getEmployees = async () => {
        const querySnapshot = await getDocs(collection(db, "employees"));
            querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            console.log(doc.id, " => ", doc.data());

            const employeesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setEmployees(employeesList);
        });
    }

    useEffect(() => {
        getEmployees();
    }, [])

  return (
    <div className='container'>
        {/* {employees.map((employee, i) => (
            <div key={i}>
                <h1>{employee.firstName}</h1>
            </div>
        ))} */}
    
        <Table employees={employees} />
    </div>
  )
}

export default Login