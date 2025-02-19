const mongoose = require("mongoose");
const { Schema } = mongoose;

const IssueSchema = new Schema({
    timestamps: true,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
    },
    repository: {
        ype: Schema.Types.ObjectId,
        ref: "Repository",
        required: true,
    },
});

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;