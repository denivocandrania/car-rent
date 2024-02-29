import  express from "express";
import { readCar, addCar, updateCar, deleteCar } from "../controller/car";

const app = express()

app.use(express.json())

app.get('/car', readCar)
app.post('/car', addCar)
app.put('/car/:id', updateCar)
app.delete('/car/:id', deleteCar)

export default app