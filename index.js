const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const Data = require("./models/post");
const cors = require("cors");
const conn = require("./connections/connect");
const fileUpload = require("express-fileupload");
const path = require("path");
const port = 8080;
const uri = "mongodb+srv://mohan:mohan@cluster0.ulwdrsg.mongodb.net/?retryWrites=true&w=majority"
const app = express();

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
app.use(fileUpload())
// conn();
mongoose.set('strictQuery', true);
app.use(cors());


async function connection() {
    await mongoose.connect(uri, (err) => {
        if (err) {
            console.log("Connection to mongodb failed")
        }
        else console.log("Connected to mongoDB successfully")
    })
}

connection();

app.post("/post", (req, res) => {
    console.log(req.body, req.files);
    res.json({ msg: "post post working" });
})


app.post("/api", (req, res) => {
    const { author, location, description } = req.body
    const { image_file } = req.files
    image_file.mv("./uploads/" + image_file.name, async (err) => {
        if (err) {
            res.json({ message: err })
        }
        else {
            const post = new Data({
                ...{ author, location, description },
                image_file: image_file.name
            })
            try {
                const response = await post.save()
                res.json({ message: 'success', response })
            } catch (e) {
                res.json({ message: 'failure', response: e })
            }
        }
    })
})

app.get("/", async (req, res) => {
    res.json({ result: await Data.find() })
})


// app.post("/user", async (req, res) => {
//     const { username, password } = req.body
//     const userObject = new User({
//         username,
//         password,
//     })
//     const response = await userObject.save()
//     res.json({ message: response })
// })

app.get("/all", async (req, res) => {

})

app.get("/images/:fileName", async (req, res) => {
    console.log(`./uploads/${req.params.fileName}`)
    res.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})



app.listen(port, () => {
    console.log("server is up");
})