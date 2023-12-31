import Navbar from "../Navbar/Navbar";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import NavbarConnected from "../Navbar/NavbarConnected";
import BanPage from "../BanPage/BanPage";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [user, setUser] = useState([]);
  const [reRender, setReRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("https://pfe-back-g4-dev.herokuapp.com/users/whoami", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((temp) => {
        console.log(temp);
        setUser(temp);
      });
  }, []);

  //if user is not authenticated
  if (user === null) {
    return (
      <div>
        <Navbar />
        <div>
          <main>{children}</main>
        </div>
      </div>
    );
  } else if (user.is_banned) {
    localStorage.setItem("token", "");
    return (
      <div>
        <BanPage />
      </div>
    );
  }
  //if user is an admin
  else if (user.is_admin) {
    return (
      <div>
        <NavbarAdmin />
        <div>
          <main>{children}</main>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavbarConnected />
        <div>
          <main>{children}</main>
        </div>
      </div>
    );
  }
};

export default Layout;
