import { Schema, model } from 'mongoose';

const calendarSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50,
    },

    description: {
        type: String,
        trim: true,
        maxLength: 500,
    },

    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },

    location: {
        type: String,
        trim: true,
        maxLength: 100,
    },

    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
})

const Calendar = model('Calendar', calendarSchema);

export default Calendar;