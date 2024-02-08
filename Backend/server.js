import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRouthes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/post.js";
import { verifyToken } from "./middleWare/auth.js";


/*CONFIGURATIONS*/
const __filename =fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());


// Adjust the path to serve static files from your directory
app.use("/assets/public/assets", express.static(path.join(__dirname, 'public/assets')));


/*FILE STORAGE*/ 
const storage=multer.diskStorage({destination:function(req,file,cb){
    cb(null,'public/assets')
},
filename:function(req,file,cb){
    cb(null,file.originalname)
}
});
const upload=multer({storage});

/*ROUTE WITH FILES */
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verifyToken,upload.single("picture"),createPost)

/* ROUTES */

app.use("/auth", authRouthes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);

/* MONGOOGSE SETUP */
const PORT=process.env.PORT;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));