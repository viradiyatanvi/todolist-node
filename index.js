const express=require('express');

const port=8000;

const app=express();

const path=require('path');

const fs=require('fs');

// const db=require("./config/db");
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://tanviViradiya28:Tanvi123@cluster0.sk3ly.mongodb.net/employ", {
    // useNewUrlParser: true, 
    // useUnifiedTopology: true 
})
.then(() => console.log("DB is connected"))
.catch((err) => console.log(err));

const Employee=require('./models/employee');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/view_emp',async(req,res)=>{
    let empData=await Employee.find();
    return res.render('view_emp',{
        empData
    })
})

app.get('/view',async(req,res)=>{
    let empData=await Employee.find();
    return res.render('view',{
        empData
    })
})

app.get('/deletedata',async(req,res)=>{
    let id=req.query.empid;
    let singleData=await Employee.findById(id);
    const deletePath=path.join(__dirname,singleData.image)
    if(deletePath){
        try{
            fs.unlinkSync(deletePath);
        }
        catch(err){
            console.log("image is not found");
        }
    }
    await Employee.findByIdAndDelete(id);
    return res.redirect('back');
})

app.get('/viewdata/:id',async(req,res)=>{
    let singleObj=await Employee.findById(req.params.id);
    return res.render('view',{
        singleObj
    })
})

app.post('/insertdata',Employee.uploadImageFile,async(req,res)=>{
    var imagePath='';
    if(req.file){
        imagePath= await Employee.imgPath+'/'+req.file.filename;
    }
    req.body.image=imagePath;
    await Employee.create(req.body);
    return res.redirect("view_emp");
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server is start:"+port)
})