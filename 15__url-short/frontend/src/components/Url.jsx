import React, { useState, useEffect } from "react";
import axios from "axios";
import ListURLs from "./ListURLs";

function Url() {
  const [target, setTarget] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  async function handleClick() {
    setErr("");
    if (!target) {
      setErr("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/url`,
        { targetUrl: target },
        { withCredentials: true }
      );

      // server returns { shortUrl, data, ... }
      setShortUrl(response.data.shortUrl);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setErr(
        error?.response?.data?.err ||
          error?.response?.data?.msg ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(async () => {
    try {
      const response = axios.get(
        `${import.meta.env.VITE_BACKEND_API}/auth/whoami`,
        {
          withCredentials: true,
        }
      );

      if (response.data.user.role === "ADMIN") setAdmin(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Ben URL Shortener</h1>

      <input
        type="text"
        placeholder="enter url (including https://)"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        style={{ width: "400px" }}
      />
      <br />
      <br />
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Creating..." : "Submit"}
      </button>

      <div style={{ marginTop: 20 }}>
        {err && <div style={{ color: "red" }}>{err}</div>}
        {shortUrl && (
          <div>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>

      <hr />
      <div style={{ marginTop: 20 }}>
         {isAdmin && <ListURLs /> }
      </div>
    </div>
  );
}

export default Url;
