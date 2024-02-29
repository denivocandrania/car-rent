import  express from "express";
import { addAdmin, readAdmin, updateAdmin, deleteAdmin, login } from "../controller/admin";
import { verifyAdmin } from "../middleware/verifyAdmin";
const app = express()

app.use(express.json())

app.get('/admin',  readAdmin)
app.post('/admin',  addAdmin)
app.put('/admin:id', verifyAdmin, updateAdmin)
app.delete('/admin:id', verifyAdmin, deleteAdmin)
app.post('/admin/login', verifyAdmin, login)

export default app
