import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Fragment } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, showLogin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const handleClick = () => {
    navigate("/drawForm");
  };

  const handlePreviousWinnwer = () => {
    navigate("/previousWinners");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link className="logo" to="/">
          Lucky Draw
        </Link>
      </div>
      <ul>
        <li>
          <button className="btn" onClick={handlePreviousWinnwer}>
            <FaUser />
            Previous winners
          </button>
        </li>
        {user ? (
          <Fragment>
            <li>
              <button className="btn" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
            <li>
              <button className="btn " onClick={handleClick}>
                Go To Form
              </button>
            </li>
          </Fragment>
        ) : (
          <>
            <li>
              {showLogin && (
                <Link to="/login">
                  <FaSignInAlt />
                  Login
                </Link>
              )}
            </li>
            {/* <li>
              <Link to="/Register">
                <FaUser />
                Register
              </Link>
            </li> */}
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
