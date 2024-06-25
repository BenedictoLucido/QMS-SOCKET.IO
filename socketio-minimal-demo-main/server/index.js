const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

// Event listener for new connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for 'client_called' event from clients
    socket.on('client_called', (data) => {
        console.log("Test case");
        // Broadcast the 'client_called' event to all connected clients
        io.emit('client_arrived', data);
        io.emit('update_statistics'); // Notify to update statistics

        // Extract window ID dynamically from the data object
        const displayData = {
            window: data.window, // Use the window ID from the data object
            queueNumber: data.queueNumber,
            clientName: data.clientName
        };
        io.emit('update_display', displayData);
    });

    socket.on('window_update', (data) => {
        console.log("Test case2");
        // Broadcast the 'client_called' event to all connected clients
        io.emit('window_updated', data);
        io.emit('update_statistics'); // Notify to update statistics
    });

    // When a window update occurs
    socket.on('window_update', (data) => {
        io.emit('window_updated', data); // Broadcast to all clients
        io.emit('update_statistics'); // Notify to update statistics
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
    // New event handler for queueNumber in android
    socket.on('queueNumber', (data) => {
        console.log("Test case marielle");
        console.log('Queue Number received:', data);
        // Broadcast the queue number to all connected clients
        io.emit('new_queue_item', data);
        io.emit('update_statistics'); // Notify to update statistics

    });

    // // Simulate sending new client data
    // setInterval(() => {
    //     const clientData = {
    //         clientName: `Client ${Math.floor(Math.random() * 100)}`,
    //         queueNumber: Math.floor(Math.random() * 100),
    //         serviceType: 'Service A',
    //         actionType: 'Action A',
    //         transactionDate: new Date().toLocaleDateString(),
    //         transactionTime: new Date().toLocaleTimeString()
    //     };
    //     io.emit('new_client', clientData);
    // }, 5000); // Emit every 5 seconds (for demonstration)
});

// Start the HTTP server and listen on port 8080
http.listen(8080, () => {
    console.log('Listening on http://localhost:8080');
});
