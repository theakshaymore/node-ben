import { useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [receivedBytes, setReceivedBytes] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchLargeJSON = async () => {
    setLoading(true);
    setError("");
    setData(null);
    setReceivedBytes(0);

    let receivedLength = 0;
    const chunks = [];

    try {
      // You can replace this URL with your own API endpoint.
      const response = await fetch("https://dummyjson.com/posts?limit=150");

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Streaming is not supported in this browser.");
      }

      const reader = response.body.getReader();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;
        setReceivedBytes(receivedLength);
      }

      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;

      for (const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      const result = new TextDecoder("utf-8").decode(chunksAll);
      const jsonData = JSON.parse(result);
      setData(jsonData);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <h1>JSON Streaming Demo</h1>
      <p className="hint">Click the button to fetch JSON in chunks.</p>

      <button onClick={fetchLargeJSON} disabled={loading}>
        {loading ? "Loading..." : "Fetch Large JSON"}
      </button>

      <p>Received: {receivedBytes} bytes</p>
      {error && <p className="error">Error: {error}</p>}

      {data && (
        <section className="result">
          <p>
            Loaded successfully. Items: {Array.isArray(data.posts) ? data.posts.length : 0}
          </p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}

export default App;
