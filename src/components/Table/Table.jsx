import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import TableEditButton from "../Buttons/TableEditButton";
import TableDeleteButton from "../Buttons/TableDeleteButton";

const Table = ({ employees, handleEdit, handleDelete, loading }) => {
  if (loading) {
    return (
      <div className="">
        <SyncLoader size={15} color="#0000FF" />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">Students Data</p>
      </div>
      <div className="card-body p-0">
        <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th colSpan={1} className="table-head">
                  Actions
                </th>
                <th className="table-head">First Name</th>
                <th className="table-head">Last Name</th>
                <th className="table-head">Address</th>
                <th className="table-head">Contact Number</th>
                <th className="table-head">Id</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {employees && employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id} className="table-row">
                    <td className="table-cell">
                      <TableEditButton onClick={() => handleEdit(employee.id)} />
                      <TableDeleteButton onClick={() => handleDelete(employee.id)} />
                    </td>
                    <td className="table-cell">{employee.firstName}</td>
                    <td className="table-cell">{employee.lastName}</td>
                    <td className="table-cell">{employee.address}</td>
                    <td className="table-cell">{employee.contactNumber}</td>
                    <td className="table-cell">{employee.id}</td>
                  </tr>
                ))
              ) : (
                <tr className="table-row">
                  <td colSpan={7} className="text-center">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
