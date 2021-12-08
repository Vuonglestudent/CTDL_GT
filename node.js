let index = 0;

export class Video {
    constructor(data) {
        let dataAPI = data.items[0];
        this.id = dataAPI.id;
        this.titleVideo = `${dataAPI.snippet.title}`;
        this.src = `https://www.youtube.com/embed/${dataAPI.id}`;
        this.image = `http://img.youtube.com/vi/${dataAPI.id}/hqdefault.jpg`;
        this.channelTitle = `${dataAPI.snippet.channelTitle}`;
        this.publishedAt = `${dataAPI.snippet.publishedAt}`;
        this.index = index;
        index++;
    }
}

export default class Node {
    constructor(data) {
        this.video = new Video(data);
        this.prev = null;
        this.next = null;
    }
}




