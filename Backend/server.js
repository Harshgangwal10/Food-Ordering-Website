import express from "express"
import http from "http"
import { Server } from "socket.io"
import jwt from "jsonwebtoken"
import cors from "cors"
import { connectDB } from "./config/db.js"
import { ensureDefaultAdmin } from "./config/seedAdmin.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoutes.js"


//app config
const app =express()
const port = process.env.PORT || 4000;
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL?.split(",") || "*" } })

io.use((socket, next) => {
  try {
    socket.user = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET)
    next()
  } catch {
    next(new Error("Unauthorized"))
  }
})
io.on("connection", (socket) => {
  socket.join(`user:${socket.user.id}`)
  if (socket.user.role === "admin") socket.join("admins")
})
app.set("io", io)

//middleware

app.use(express.json())
app.use(cors())


// db connection
await connectDB();
await ensureDefaultAdmin();

// Api endpoints


app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user" ,userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
  res.send("API Working")
})


server.listen(port,()=>{
  console.log(`server started on http://localhost:${port}`)
})


