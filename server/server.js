import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import Item from './modals/data.js'
import connectdb from './config/db.js'

const app = express();
const port = 5050;

connectdb();
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.use(cors());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to store files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage:storage });


//insertdata 
app.post('/additem', upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), (req, res) => {
  try {
    const { name, type, description } = req.body;
    const cover = req.files.cover?.[0];
    const images = req.files.images || [];

    if (!name || !type || !description || !cover) {
      return res.status(400).send("Missing required fields");
    }

    const itemData = {
      name,
      type,
      description,
      coverPath: `/uploads/${cover.filename}`,
      imagePaths: images.map(img => `/uploads/${img.filename}`),
      createdAt: new Date()
    };

    Item.create(itemData);
    
    res.status(200).send("FormData received!");
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Server error");
  }
});


//view individual data
app.get('/item/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("Not found");
    res.json(item);
  } catch (err) {
    res.status(500).send("Error fetching item");
  }
});



//get all data
app.get('/getdata', async(req,res) => {
 try {
    const items = await Item.find(); 
    res.status(200).json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    res.status(500).send("Server error");
  }
})



app.listen(port, () => {
  console.log("Server listening on port", port);
});
