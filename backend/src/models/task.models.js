import mongoose , {Schema, model} from 'mongoose';

const taskSchema = new Schema(
    {
        title : {
            type : String,
            required: [true, 'Title is required'],
            trim: true,
            minLength: [3, 'Title must be at least 3 characters long'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        description : {
            type : String,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 500 characters']
        },
        status : {
            type : String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },
        // *due date
        owner : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Owner is required']

        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const Task = model('Task', taskSchema);