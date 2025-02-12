const mongoose=require('mongoose');

const imagePath='/uploads';

const path=require('path');

const multer=require('multer');

const EmployeeSchema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    genre:{
        type:Array,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    stock:{
        type:Number,
        require:true
    },
    publishedate:{
        type:String,
        require:true
    },
    publisher:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
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