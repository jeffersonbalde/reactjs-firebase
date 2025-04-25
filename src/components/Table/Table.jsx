import React from "react";
import SyncLoader from "react-spinners/SyncLoader"; // Spinner for loading

const Table = ({ employees, handleEdit, handleDelete, loading }) => {
  if (loading) {
    return (
      <div className="">
        <SyncLoader size={15} color="#0000FF" />
      </div>
    );
  }

  return (
    <div className="striped-table">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.address}</td>
                <td>{employee.contactNumber}</td>
                <td>
                  <button
                    className="button muted-button"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="button muted-button"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;