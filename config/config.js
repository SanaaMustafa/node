module.exports=function ConnectMongoDB(){
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://sanaamustafajs:333@ds113019.mlab.com:13019/market')
}

