const mongoose = require('mongoose')

const user = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    name: String,
    anonymous: Boolean,
    role: String,
    present: Boolean,
    peerID: String,
    teamcolorID: String,
    vote: Number
})

const team = new mongoose.Schema({
    teammates: [user],
    colorID: String
})

const Roomschema = new mongoose.Schema({
    room_id: String,
    topic: String,
    description: String,
    visibility: String,
    judgingsystem: [String],
    timeend: Date,
    banned: Array,
    timestarted: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    people: [user],
    teams: Array,
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    winteam: {
        winners: [team],
        tie: Boolean
    }
})

Roomschema.statics.getusersinfo

module.exports = mongoose.model('Room', Roomschema)