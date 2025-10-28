import React from "react";

function App() {
  return (
    <>
      <h1>Ben file upload -- Multer</h1>

      <form
        action="http://localhost:9000/upload"
        method="post"
        enctype="multipart/form-data"
      >
        <input type="file" name="uploadImage" />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default App;
