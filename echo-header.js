const express = require('express')
const app = express()

const port = process.env.PORT || 3000;
//Requesting header
app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers) // Here is where the requst is passed
    .map(([key, value]) =>`${key}:${value}`)   //mapped through all the requests
    res.send(headers.join('\n'))
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});