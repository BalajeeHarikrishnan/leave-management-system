import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        employees: 0,
        leaves: 0,
        approved: 0,
        pending: 0,
        rejected: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {

        try {

            const response =
                await api.get("/dashboard/stats");

            setStats(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div>

            <Navbar />

            <h1>Dashboard</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px,1fr))",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >

                <div className="card">
                    <h2>{stats.employees}</h2>
                    <p>Total Employees</p>
                </div>

                <div className="card">
                    <h2>{stats.leaves}</h2>
                    <p>Total Leaves</p>
                </div>

                <div className="card">
                    <h2>{stats.approved}</h2>
                    <p>Approved Leaves</p>
                </div>

                <div className="card">
                    <h2>{stats.pending}</h2>
                    <p>Pending Leaves</p>
                </div>

                <div className="card">
                    <h2>{stats.rejected}</h2>
                    <p>Rejected Leaves</p>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;