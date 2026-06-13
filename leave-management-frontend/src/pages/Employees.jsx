import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Employees() {

    const role = localStorage.getItem("role");

    const [employees, setEmployees] = useState([]);

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        role: "EMPLOYEE",
        leaveBalance: 20
    });

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {

        try {

            const response =
                await api.get("/employees");

            setEmployees(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const addEmployee = async () => {

        try {

            await api.post(
                "/employees",
                employee
            );

            setEmployee({
                name: "",
                email: "",
                password: "",
                department: "",
                role: "EMPLOYEE",
                leaveBalance: 20
            });

            loadEmployees();

        } catch (error) {

            alert("Add Employee Failed");
        }
    };

    const deleteEmployee = async (id) => {

        try {

            await api.delete(`/employees/${id}`);

            loadEmployees();

        } catch (error) {

            alert("Delete Failed");
        }
    };

    return (

        <div className="form-container">

            <Navbar />

            <h1>Employees</h1>

            {role === "ADMIN" && (

                <div>

                    <h2>Add Employee</h2>

                    <input
                        placeholder="Name"
                        value={employee.name}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                name: e.target.value
                            })
                        }
                    />

                    <br /><br />

                    <input
                        placeholder="Email"
                        value={employee.email}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                email: e.target.value
                            })
                        }
                    />

                    <br /><br />

                    <input
                        placeholder="Password"
                        value={employee.password}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                password: e.target.value
                            })
                        }
                    />

                    <br /><br />

                    <input
                        placeholder="Department"
                        value={employee.department}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                department: e.target.value
                            })
                        }
                    />

                    <br /><br />

                    <select
                        value={employee.role}
                        onChange={(e) =>
                            setEmployee({
                                ...employee,
                                role: e.target.value
                            })
                        }
                    >
                        <option value="EMPLOYEE">
                            EMPLOYEE
                        </option>

                        <option value="ADMIN">
                            ADMIN
                        </option>
                    </select>

                    <br /><br />

                    <button
                        onClick={addEmployee}
                    >
                        Add Employee
                    </button>

                    <hr />

                </div>

            )}

            <table border="1">

                <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Leave Balance</th>
                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {employees.map(employee => (

                    <tr key={employee.id}>

                        <td>{employee.id}</td>

                        <td>{employee.name}</td>

                        <td>{employee.email}</td>

                        <td>{employee.department}</td>

                        <td>{employee.role}</td>

                        <td>
                            {employee.leaveBalance}
                        </td>

                        <td>

                            {role === "ADMIN" && (

                                <button
                                    onClick={() =>
                                        deleteEmployee(
                                            employee.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            )}

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default Employees;