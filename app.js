const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const fs = require('fs')
let app = express()

app.use(express.static(__dirname + '/public'))

app.get('*',(req,res) => {

  fs.readFile(path.resolve(__dirname,'public/','index.html'),{
    encoding : 'utf-8'
  },(err,data) => {
    if(err){console.log(err)}
    res.send(data)
  })
  
})

app.listen(port,()=>{
  console.log(`PORT : ${port}`)
})