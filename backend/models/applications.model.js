import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
    job: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    },
    score: {
        type: Number,
        default: null
    },
    matchingSkills: {
        type: [String],
        default: []
    },
    missingSkills: {
        type: [String],
        default: []
    },
    summary: {
        type: String,
        default: ""
    }

},{timestamps:true})

export const Application = mongoose.model("Application", applicationSchema)