import {
    Link,
    useNavigate
} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role =
        localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
    };

    return (

        <div className="navbar">

            {role === "ADMIN" && (

                <>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    {" | "}

                    <Link to="/employees">
                        Employees
                    </Link>

                    {" | "}

                    <Link to="/leaves">
                        Leaves
                    </Link>

                    {" | "}

                </>

            )}

            {role === "EMPLOYEE" && (

                <>

                    <Link to="/apply-leave">
                        Apply Leave
                    </Link>

                    {" | "}

                    <Link to="/leaves">
                        My Leaves
                    </Link>

                    {" | "}

                </>

            )}

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}

export default Navbar;