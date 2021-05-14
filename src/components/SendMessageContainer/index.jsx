import React, { useState } from "react";

const SendMessageContainer = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <h1>hello</h1>
      <form action="">
        <input placeholder="Write message" type="text" />
      </form>
    </>
  );
};

export default SendMessageContainer;
