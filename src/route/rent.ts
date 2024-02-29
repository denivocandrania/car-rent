import  express from "express";
import { addRent, updateRent, deleteRent, readRent} from "../controller/rentCar";

const app = express()

app.use(express.json())

app.get('/rent', readRent)
app.post('/rent', addRent)
app.put('/rent', updateRent)
app.delete('/rent', deleteRent)

export default app