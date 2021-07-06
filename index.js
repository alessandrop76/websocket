const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.render("index");
})

 // evento padrão de conexão socket.io
 io.on("connection",(socket) => { 
    socket.on("disconnect",() => {
    console.log("X - desconectou: "+socket.id);
    });
            
    socket.on("msg",(data) =>{
    io.emit('show-msg',data);  //socket.broadcast.emit() - envia para todos menos pra mim
    console.log(data);
    });
});



http.listen(5000,() =>{
    console.log("App Rodando | 5000");
})