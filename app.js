import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './src/routes/user-routes.js';
import blogRouter from './src/routes/blog-routes.js';

const app = express();
const environmentVariables = dotenv.config();
const port = 3000;

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect(environmentVariables.parsed.MONGODB_URI)
    .then(() => app.listen(port, () => {
        console.log(`connected to the database`);
        console.log(`listening on port ${port}`);
    }))
    .catch(error => console.log(error));