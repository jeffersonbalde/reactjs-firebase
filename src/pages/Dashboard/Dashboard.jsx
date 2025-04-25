import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import Table from "../../components/Table/Table";
import AddEmployeeModal from "../../components/Modal/AddEmployeeModal";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.id, " => ", doc.data());

      const employeesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(employeesList);
      setLoading(false);
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="container flex flex-col gap-5">
      {/* {employees.map((employee, i) => (
            <div key={i}>
                <h1>{employee.firstName}</h1>
            </div>
        ))} */}
      <div className="flex flex-col items-start">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <button onClick={() => setIsModalOpen(true)}>Add Student</button>
      </div>
      <Table employees={employees} loading={loading} />
      <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} employees={employees} setEmployees={setEmployees} getEmployees={getEmployees}/>
    </div>
  );
};

export default Dashboard;
