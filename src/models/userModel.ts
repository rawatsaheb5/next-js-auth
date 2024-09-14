import mongoose, { Model } from "mongoose";
import { Schema, Document } from "mongoose";


/*
  #  This interface extends Document, meaning it inherits Mongoose's built-in document properties (like _id and createdAt) and adds the specific fields (username, email, and password) for a user.

   # This provides type safety and ensures that every user document will have these fields.
*/
interface UserSchemaInterface extends Document {
  username: string;
  email: string;
  password: string;
}

/*
 #   Schema<UserSchemaInterface>: This tells Mongoose that the schema will follow the structure defined  in the UserSchemaInterface.
*/ 
const userSchema: Schema<UserSchemaInterface> = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
      type: String,
      unique:true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
    timestamps:true,
});

/*

@ mongoose.models.users:
     This checks if the User model has already been created. In Mongoose, models are cached after being created, so this avoids creating the model multiple times.

@ mongoose.model<UserSchemaInterface>("User", userSchema):
     If the model does not exist yet, it creates the User model based on the schema.

@ as Model<UserSchemaInterface>: 
    This explicitly types the UserModel as a Mongoose model that follows the UserSchemaInterface structure.
*/ 
const UserModel : Model<UserSchemaInterface> = mongoose.models.users as Model<UserSchemaInterface>  || mongoose.model<UserSchemaInterface>("users", userSchema);

export default UserModel;
