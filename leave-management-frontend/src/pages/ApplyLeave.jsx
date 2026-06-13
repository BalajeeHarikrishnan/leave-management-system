import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function ApplyLeave() {

    const [leave, setLeave] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
    });

    const applyLeave = async () => {

        try {

            await api.post(
                "/leaves",
                {
                    leaveType: leave.leaveType,
                    startDate: leave.startDate,
                    endDate: leave.endDate,
                    reason: leave.reason,
                    status: "PENDING"
                }
            );

            alert("Leave Applied Successfully");

            setLeave({
                leaveType: "",
                startDate: "",
                endDate: "",
                reason: ""
            });

        } catch (error) {

            console.log(error);

            alert("Failed To Apply Leave");
        }
    };

    return (

        <div className="form-container">

            <Navbar />

            <h1>Apply Leave</h1>

            <input
                placeholder="Leave Type"
                value={leave.leaveType}
                onChange={(e) =>
                    setLeave({
                        ...leave,
                        leaveType: e.target.value
                    })
                }
            />

            <br /><br />

            <input
                type="date"
                value={leave.startDate}
                onChange={(e) =>
                    setLeave({
                        ...leave,
                        startDate: e.target.value
                    })
                }
            />

            <br /><br />

            <input
                type="date"
                value={leave.endDate}
                onChange={(e) =>
                    setLeave({
                        ...leave,
                        endDate: e.target.value
                    })
                }
            />

            <br /><br />

            <textarea
                placeholder="Reason"
                value={leave.reason}
                onChange={(e) =>
                    setLeave({
                        ...leave,
                        reason: e.target.value
                    })
                }
            />

            <br /><br />

            <button onClick={applyLeave}>
                Apply Leave
            </button>

        </div>
    );
}

export default ApplyLeave;