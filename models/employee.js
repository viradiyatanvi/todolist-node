const mongoose=require('mongoose');

const imagePath='/uploads';

const path=require('path');

const multer=require('multer');

const EmployeeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    genre:{
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    publishedate:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
})

const storageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imagePath));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

EmployeeSchema.statics.uploadImageFile=multer({storage:storageImage}).single('image');
EmployeeSchema.statics.imgPath=imagePath;

const Employee=mongoose.model("Employee",EmployeeSchema);

module.exports=Employee;