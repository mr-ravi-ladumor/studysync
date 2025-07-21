import { Schema, model } from 'mongoose';

const calendarSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100,
    },
  
    startDateTime: {
        type: Date,
        required: true,
    },

    endDateTime: {
        type: Date,
        required: true,
    },

    location: {
        type: String,
        trim: true,
        maxLength: 100,
    },

    category: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        trim: true,
        maxLength: 500,
    },

    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true
})

const Calendar = model('Calendar', calendarSchema);

export default Calendar;