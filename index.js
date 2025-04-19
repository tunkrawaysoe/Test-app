import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import authRoutes from "./routes/authroutes.js"; 
import userRoutes from './routes/userRoutes.js'

//CONFIGURATIONS
const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName);
const app = express();
dotenv.config();

//middlewares
app.use(express.json({limit:"30mb",extended : true}));
app.use(express.urlencoded({limit:"30mb",extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(cors());
app.use('/assets',express.static(path.join(__dirName,'public/assets')));


// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets'); // directory to store uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage });

//Routes
app.use('/auth',authRoutes);
app.use('/users',userRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 4000
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected ✅');
    app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err.message);
  });


app.get('/',(req,res)=>{
    res.json({
        message : "welcome to the misery world" 
    })
})

app.listen(PORT,()=> console.log(`Server is running at PORT: ${PORT}`))