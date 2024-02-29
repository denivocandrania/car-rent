import express, { Request, Response, request, response} from "express"
import { ResolvedProjectReference } from "typescript";

import admin from "./route/admin";
import car from "./route/car"
import rent from "./route/rent"

const app = express()

const port = 7800

app.use(express.json())
app.use(admin)
app.use(car)
app.use(rent)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})