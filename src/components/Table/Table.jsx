import React from 'react'

const Table = ({employees}) => {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                </tr>
            </thead>
            <tbody>
                {employees ? (
                    employees.map((employee, i) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                        </tr>
                    ))
                ): (
                    <tr>
                        <td>No Employees</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default Table