import React, { useState, useEffect } from "react";
import axios from "axios";

function ListURLs() {
  //
  const [urls, setUrls] = useState([]);

  async function getAllURLs() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/url/admin`,
        { withCredentials: true }
      );

      setUrls(response.data.response);
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllURLs();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "4px" }}>
        URLs Dashboard
      </h1>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "normal",
          color: "#aaa",
          marginBottom: "16px",
        }}
      >
        This section is for admin only
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "8px",
                textAlign: "left",
              }}
            >
              Short ID
            </th>
            <th
              style={{
                padding: "8px",
                textAlign: "left",
              }}
            >
              Target URL
            </th>
            <th
              style={{
                padding: "8px",
                textAlign: "left",
              }}
            >
              Visits
            </th>
          </tr>
        </thead>
        <tbody>
          {urls && urls.length > 0 ? (
            urls.map((url) => (
              <tr key={url.urlShortId}>
                <td
                  style={{
                    padding: "8px",
                  }}
                >
                  {url.urlShortId}
                </td>
                <td
                  style={{
                    padding: "8px",
                    wordBreak: "break-all",
                  }}
                >
                  {url.urlTarget}
                </td>
                <td style={{ padding: "8px" }}>{url.urlHistory.length}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "16px" }}>
                No URLs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListURLs;
