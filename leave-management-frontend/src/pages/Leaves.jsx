import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Leaves() {

    const role = localStorage.getItem("role");

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        loadLeaves();
    }, []);

    const loadLeaves = async () => {

        try {

            const endpoint =
                role === "ADMIN"
                    ? "/leaves"
                    : "/leaves/my";

            const response =
                await api.get(endpoint);

            setLeaves(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const approveLeave = async (id) => {

        try {

            await api.put(
                `/leaves/${id}/approve`
            );

            loadLeaves();

        } catch (error) {

            alert("Approve Failed");
        }
    };

    const rejectLeave = async (id) => {

        try {

            await api.put(
                `/leaves/${id}/reject`
            );

            loadLeaves();

        } catch (error) {

            alert("Reject Failed");
        }
    };

    const getStatusColor = (status) => {

        if (status === "APPROVED") {
            return "green";
        }

        if (status === "REJECTED") {
            return "red";
        }

        return "orange";
    };

    return (

        <div>

            <Navbar />

            <h1>
                {role === "ADMIN"
                    ? "Leave Management"
                    : "My Leaves"}
            </h1>

            <table border="1">

                <thead>

                <tr>

                    <th>ID</th>
                    <th>Leave Type</th>
                    <th>Employee</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>

                    {role === "ADMIN" &&
                        <th>Actions</th>}

                </tr>

                </thead>

                <tbody>

                {leaves.map(leave => (

                    <tr key={leave.id}>

                        <td>{leave.id}</td>

                        <td>{leave.leaveType}</td>

                        <td>
                            {leave.employee?.name}
                        </td>

                        <td>
                            {leave.startDate}
                        </td>

                        <td>
                            {leave.endDate}
                        </td>

                        <td>{leave.reason}</td>

                        <td>

                            <span
                                style={{
                                    color:
                                        getStatusColor(
                                            leave.status
                                        ),
                                    fontWeight: "bold"
                                }}
                            >
                                {leave.status}
                            </span>

                        </td>

                        {role === "ADMIN" && (

                            <td>

                                <button
                                    disabled={
                                        leave.status !== "PENDING"
                                    }
                                    onClick={() =>
                                        approveLeave(
                                            leave.id
                                        )
                                    }
                                >
                                    Approve
                                </button>

                                {" "}

                                <button
                                    disabled={
                                        leave.status !== "PENDING"
                                    }
                                    onClick={() =>
                                        rejectLeave(
                                            leave.id
                                        )
                                    }
                                >
                                    Reject
                                </button>

                            </td>

                        )}

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default Leaves;