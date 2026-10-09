const app = require('./src/app');
const connectDB = require('./src/db/connectDB');

connectDB();

PORT_NO = process.env.PORT_NO || 5000;

app.listen(PORT_NO,()=>{
    console.log(`Server is running on port no. ${PORT_NO}`);
})