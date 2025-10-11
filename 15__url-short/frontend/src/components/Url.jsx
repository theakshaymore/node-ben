import React, { useState } from "react";
import axios from "axios";

function Url() {
  const [target, setTarget] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleClick() {
    setErr("");
    if (!target) {
      setErr("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5001/url", {
        targetUrl: target,
      });

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
    </div>
  );
}

export default Url;
