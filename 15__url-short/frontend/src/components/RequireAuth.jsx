// src/components/RequireAuth.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function RequireAuth({ children }) {
  const [status, setStatus] = useState({ loading: true, authed: false });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("http://localhost:5001/auth/me", {
          withCredentials: true, // important — sends cookie
        });
        if (!mounted) return;
        if (res.status === 200 && res.data?.user) {
          setStatus({ loading: false, authed: true });
        } else {
          setStatus({ loading: false, authed: false });
        }
      } catch (err) {
        if (!mounted) return;
        setStatus({ loading: false, authed: false });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (status.loading) {
    return <div>Checking auth…</div>; // spinner / skeleton is nicer
  }

  if (!status.authed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
