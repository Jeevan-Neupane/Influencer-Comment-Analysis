// YourComponent.tsx

import React, { useEffect } from "react";
import useWebSocket from "react-use-websocket";

const YourComponent: React.FC = () => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    "ws://127.0.0.1:8000/ws"
  );

  useEffect(() => {
    sendJsonMessage({
      Message: "how to increase audience involvement",
      payload: "how to increase audience involvement",
    });

    return () => {};
  }, []);


  return (
    <div>
      <p>WebSocket State: {readyState}</p>
    </div>
  );
};

export default YourComponent;
