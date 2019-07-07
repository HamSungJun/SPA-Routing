const app = require('express')()

app.get('/',(req,res) => {
  res.sendFile(__dirname+"/index.html")
})

app.get('/getData',(req,res) => {
  res.json({
    a : 1,
    b : 2
  }).end()
})

app.listen(3000)