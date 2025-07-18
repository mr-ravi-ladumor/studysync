import { Schema, model } from 'mongoose';

const calendarSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100,
    },

    description: {
        type: String,
        trim: true,
        maxLength: 500,
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