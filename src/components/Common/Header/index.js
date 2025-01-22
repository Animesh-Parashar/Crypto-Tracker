import React, { useState, useEffect } from "react";
import TemporaryDrawer from "./drawer";
import "./styles.css";
import Button from "../Button";
import { Link } from "react-router-dom";
import { auth, provider } from "../../../Firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth"; // Import signOut

function Header() {
  const [user, setUser] = useState(null); // State to store user data

  // Function to handle Google Login
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user); // Store user details in state
        window.location.href = "http://localhost:3000/dashboard"; // Redirect to dashboard
      })
      .catch((error) => console.error("Login failed:", error.message));
  };

  // Function to handle Logout
  const handleLogout = () => {
    signOut(auth) // Signs the user out
      .then(() => {
        setUser(null); // Clear user data from state
        window.location.href = "http://localhost:3000/"; // Redirect to home page
      })
      .catch((error) => console.error("Logout failed:", error.message));
  };

  // Check if user is already logged in
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null); // Reset user data on logout
      }
    });
  }, []);

  return (
    <div className="navbar">
      <h1>
        CoinSpace<span style={{ color: "var(--blue)" }}>.</span>
      </h1>
      <div className="links">
        <Link to="/">
          <p className="link">Home</p>
        </Link>
        <Link to="/compare">
          <p className="link">Compare</p>
        </Link>
        <Link to="/watchlist">
          <p className="link">Watchlist</p>
        </Link>
        <Link to="/dashboard">
          <Button text={"Dashboard"} outlined={true} />
        </Link>

        {/* Conditionally render Login or Logout button */}
        {user ? (
          <>
            <img
              src={user.photoURL}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={handleLogout} // Clicking the image also logs out
            />
            <Button text={"Log Out"} onClick={handleLogout} />
          </>
        ) : (
          <Button text={"Log In / Sign Up"} onClick={handleLogin} outlined={true}/>
        )}
      </div>

      <div className="mobile-drawer">
        <TemporaryDrawer />
      </div>
    </div>
  );
}

export default Header;
