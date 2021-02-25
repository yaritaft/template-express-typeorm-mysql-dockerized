import express from "express";
import { createUser, testOps } from "./src/services/db";

export const app = express()
export const port = 3000

createUser();
testOps()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})