import mongoose from "mongoose";
/*

#   connectionObject:
     This is a custom TypeScript type defining an object with an optional property isConnected of type number.
*/ 
type connectionObject =  {
    isConnected?:number     // The ? indicates that this property is optional. This means the connectionObject may or may not have the isConnected property
}
const connection: connectionObject = {};


/*

# Promise<void>:
     This specifies that the function doesn't return any value, but it does return a promise (which is resolved or rejected based on success or failure of the connection).
*/ 
async function dbConnect():Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected to database!')
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to database',)

        
    }
    catch (error) {
        console.log("failed to connect", error);
        process.exit(1);
    }
}

export default dbConnect;