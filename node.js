let video = [
    {
        id: 1,
        name: 'Vid 1',
        src: 'https://youtu.be/rGhvqK9eLBg?list=RDrGhvqK9eLBg',
        image: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
    },
    {
        id: 2,
        name: 'Vid 2',
        src: 'https://youtu.be/H0N-49WBBxk?list=RDMM',
        image: 'https://www.w3schools.com/w3images/fjords.jpg'
    },
    {
        id: 3,
        name: 'Vid 3',
        src: 'https://youtu.be/ORQB3w-hWRo?list=RDMM',
        image: 'https://thumbs.dreamstime.com/b/cosmos-beauty-deep-space-elements-image-furnished-nasa-science-fiction-art-102581846.jpg'
    },
]

export default class Node {
    constructor(video) {
        this.video = video;
        this.prev = null;
        this.next = null;
        this.size = 0;
    }
}

