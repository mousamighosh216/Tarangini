import React, { useState, useEffect } from "react";
import { authFetch } from "../utils/authFetch";

export default function Me() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("access_token");
if (!token) return; // don't fetch without token

const response = await authFetch("/auth/me", {
  method: "GET",
});

      const data = await response.json();
      if (response.ok) setUser(JSON.stringify(data));
      else setUser(JSON.stringify(data));
    };

    fetchMe();
  }, []);

   return (
    <div>
      <h2>Profile</h2>
      <p>{user}</p>
    </div>
  );
}