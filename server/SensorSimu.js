
//dummy data for hardware data
let socket = require('socket.io-client')('http://localhost:3000')
let initial_data = 0;

 //Simulating reading data every 100 milliseconds
setInterval(function() {
    //some sudo-randomness to change the values but not to drastically
    let nextMin = (initial_data-2)>0 ? initial_data-2 : 2;
    let nextMax = initial_data+5 < 100 ? initial_data+5 : Math.random() * (130 - 5 + 1) + 5;

    battery_data = Math.floor(Math.random() * (nextMax - nextMin + 3.5) + nextMin);
    height_data = Math.floor(Math.random() * (nextMax - nextMin + 1.25) + nextMin);
    tx_data = Math.floor(Math.random() * (nextMax - nextMin + 1.4) + nextMin);
    rx_data = Math.floor(Math.random() * (nextMax - nextMin + 0.5) + nextMin);
    //we emit the data. No need to JSON serialization!
    socket.emit('incoming battery', battery_data);
    // console.log('battery data:',battery_data);
    socket.emit('incoming height', height_data);
    // console.log('height data:',height_data);
    socket.emit('incoming tx', tx_data);
    // console.log('height tx:',tx_data);
    socket.emit('incoming rx', rx_data);
    // console.log('height rx:',rx_data);
}, 500);

