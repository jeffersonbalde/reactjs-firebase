import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import Table from "../../components/Table/Table";
import AddStudentModal from "../../components/Modal/AddStudentModal";
import Swal from "sweetalert2";
import SyncLoader from "react-spinners/SyncLoader";
import EditStudentModal from "../../components/Modal/EditStudentModal";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCloseOpen, setIsModalCloseOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Student Record?",
      text: "This action cannot be undone. Are you sure you want to proceed?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        htmlContainer: "swal-text",
        icon: "swal-icon",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
        actions: "swal-actions",
      },
      didOpen: () => {
        const popup = document.querySelector(".swal-popup");
        const title = document.querySelector(".swal-title");
        const text = document.querySelector(".swal-text");
        const icon = document.querySelector(".swal-icon");
        const actions = document.querySelector(".swal-actions");

        if (popup) {
          popup.style.padding = "15px";
          popup.style.maxWidth = "350px";
        }
        if (icon) {
          icon.style.margin = "10px auto -30px auto";
        }
        if (title) {
          title.style.marginBottom = "6px";
          title.style.fontSize = "1.8rem";
        }
        if (text) {
          text.style.marginBottom = "10px";
          text.style.fontSize = "1.2rem";
        }
        if (actions) {
          actions.style.display = "flex";
          actions.style.justifyContent = "center";
          actions.style.gap = "10px";
          actions.style.marginTop = "10px";
        }

        const confirmBtn = document.querySelector(".swal-confirm");
        const cancelBtn = document.querySelector(".swal-cancel");

        if (confirmBtn) {
          confirmBtn.style.backgroundColor = "#7A3200";
          confirmBtn.style.color = "white";
          confirmBtn.style.border = "none";
          confirmBtn.style.padding = "13px 16px";
          confirmBtn.style.borderRadius = "6px";
          confirmBtn.style.transition = "background-color 0.2s";
        }

        if (cancelBtn) {
          cancelBtn.style.backgroundColor = "#354A53";
          cancelBtn.style.color = "white";
          cancelBtn.style.border = "none";
          cancelBtn.style.padding = "13px 16px";
          cancelBtn.style.borderRadius = "6px";
          cancelBtn.style.transition = "background-color 0.2s";
        }

        const style = document.createElement("style");
        style.innerHTML = `
        .swal-confirm:hover {
          background-color: #7A3200 !important;
        }
        .swal-cancel:hover {
          background-color: #4b5563 !important;
        }
      `;
        document.head.appendChild(style);
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // const [employee] = employees.filter((employee) => employee.id === id);

        // await deleteDoc(doc(db, "employees", id));

        // const employeesCopy = employees.filter(
        //   (employee) => employee.id !== id
        // );
        // setEmployees(employeesCopy);
        // setLoading(true);
        try {
          await deleteDoc(doc(db, "employees", id));
          setEmployees((prev) => prev.filter((employee) => employee.id !== id));
        } catch (error) {
          Swal.fire("Error", "Failed to delete record", "error");
        }
      }
    });
  };

  const handleEdit = id => {
    const selected = employees.find((emp) => emp.id === id); // returns object
    setSelectedStudent(selected); // GOOD: sets a single object
    console.log('selected', selected);
    setIsModalCloseOpen(true);
  };

  const getEmployees = async () => {
    // setLoading(true);
    // const querySnapshot = await getDocs(collection(db, "employees"));
    // querySnapshot.forEach((doc) => {
    //   // console.log(`${doc.id} => ${doc.data()}`);
    //   console.log(doc.id, " => ", doc.data());

    //   const employeesList = querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   setEmployees(employeesList);
    // });
    // setLoading(false);

    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "employees"));
      const employeesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

      setEmployees(employeesList);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="container flex flex-col h-full w-full overflow-auto p-3 ">

      {/* {employees.map((employee, i) => (
            <div key={i}>
                <h1>{employee.firstName}</h1>
            </div>
        ))} */} 
      <div className="flex flex-col items-start gap-4 p-5">
        <h1 className="text-3xl font-bold">ReactJS with Firebase Cloud Firestore CRUD APP</h1>
        <p className="">by Jefferson Balde</p>
        <button onClick={() => setIsModalOpen(true)}>Add Student</button>
      </div>

      {loading ? (
        <div className="">
          <SyncLoader size={15} color="#0000FF" />
        </div>
      ) : (
        <Table
          employees={employees}
          loading={loading}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employees={employees}
        setEmployees={setEmployees}
        getEmployees={getEmployees}
      />
      <EditStudentModal
        isOpen={isModalCloseOpen}
        onClose={() => setIsModalCloseOpen(false)}
        employees={employees}
        selectedStudent={selectedStudent}
        setEmployees={setEmployees}
        getEmployees={getEmployees}
      />
    </div>
  );
};

export default Dashboard;
