const setupWebSocket = (dispatch, updateCrypto) => {
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(updateCrypto(data));
    };
  
    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };
  
    return socket;
  };

export default setupWebSocket
  