const fs = require('fs');
const axios = require('axios');

require('dotenv').config();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const youtubeFile = 'topsongs-youtube.json';
const bilibiliFile = 'topsongs-bilibili.json';

fs.copyFileSync(youtubeFile, `${youtubeFile}.bak`);
fs.copyFileSync(bilibiliFile, `${bilibiliFile}.bak`);

const youtube = JSON.parse(fs.readFileSync(youtubeFile, 'utf8'));
const bilibili = JSON.parse(fs.readFileSync(bilibiliFile, 'utf8'));

function byViews(a,b) {
    return b.views - a.views;
};

function getYoutube() {
    const promises = [];
    for (const s of [ ...youtube.english, ...youtube.other ]) {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${s.video}&key=${YOUTUBE_API_KEY}`;
        promises.push(axios.get(url).then(v => {
            s.views = Number(v.data.items[0].statistics.viewCount);
            const mviews = Math.floor(s.views / 100000) / 10;
            if (s.mviews !== mviews) {
                console.log(`${s.mviews} -> ${mviews} - ${s.title} (YouTube)`);
                s.mviews = mviews;
            }
        }));
    }

    return Promise.all(promises).then(() => {
        youtube.english.sort(byViews);
        youtube.other.sort(byViews);
        console.log(`Saving ${youtubeFile}...`);
        fs.writeFileSync(youtubeFile, JSON.stringify(youtube, null, 4));
    });
}

function getBilibili() {
    const promises = [];
    for (const s of bilibili) {
        let query;
        if (s.video.startsWith('BV')) {
            query = `bvid=${s.video}`;
        } else {
            query = `aid=${s.video.substr(2)}`;
        }
        const url = `https://api.bilibili.com/x/web-interface/wbi/view?${query}`;
        promises.push(axios.get(url).then(v => {
            s.views = Number(v.data.data.stat.view);
            const mviews = Math.floor(s.views / 100000) / 10;
            if (s.mviews !== mviews) {
                console.log(`${s.mviews} -> ${mviews} - ${s.title} (Bilibili)`);
                s.mviews = mviews;
            }
        }));
    }

    return Promise.all(promises).then(() => {
        bilibili.sort(byViews);
        console.log(`Saving ${bilibiliFile}...`);
        fs.writeFileSync(bilibiliFile, JSON.stringify(bilibili, null, 4));
    });
}

Promise.all([ getYoutube(), getBilibili() ]).then(() => {
    console.log('View counts have been updated.');
});