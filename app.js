const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
let app = express()

app.use(express.static(__dirname + '/public'))

app.get('*',(req,res) => {
  res.sendFile(__dirname+"/index.html")
})

app.listen(port,()=>{
  console.log(`PORT : ${port}`)
})