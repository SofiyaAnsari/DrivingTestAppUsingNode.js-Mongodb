const mongoose=require('mongoose');
const uri = "";
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{console.log('Mongodb Connected')})
.catch((error)=>{console.error(error)})

const drivingSchema = mongoose.Schema({

    firstname: String,
    lastname: String,
    LicenseNo: String,
    Age: String,
    car_details: {
    make: String,
    model: String,
    year: String,
    platno: String
    }



})


const drivingtest = mongoose.model('Details',drivingSchema)

module.exports = drivingtest