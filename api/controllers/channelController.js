const fetch = require('node-fetch');
const json = 'format=json';
const showAll = 'pagination=false';

const getAllChannels = async (req, res) => {
    let channels = await fetch(`http://api.sr.se/api/v2/channels?${json}&${showAll}`);
    channels = await channels.json();
    res.json(channels.channels);
};

const getChannelById = async (req, res) => {
    let channel = await fetch(`http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`);
    channel = await channel.json();
    res.json(channel);
};

const getChannelSchedule = async (req, res) => {
    let channelSchedule = await fetch(`http://api.sr.se/api/v2/scheduledepisodes?channelId=${req.params.channelId}&date=${req.query.date}&${json}&${showAll}`);
    channelSchedule = await channelSchedule.json();
    res.json(channelSchedule.schedule);
};

const getProgramsByChannel = async (req, res) => {
    let programs = await fetch(`http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}&${showAll}`);
    programs = await programs.json();
    res.json(programs.programs);
}

module.exports = {
    getAllChannels,
    getChannelById,
    getChannelSchedule,
    getProgramsByChannel
};