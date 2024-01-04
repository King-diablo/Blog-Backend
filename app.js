import express from 'express';

const app = express();

const port = 3000;

app.use("/api", (req, res, next) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})