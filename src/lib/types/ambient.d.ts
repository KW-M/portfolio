declare module '*?lqip' {
    const lqip: {
        lqip: string;
        width: number;
        height: number;
        src: string;
    };
    export default lqip;
}


declare module '*?imageDetails' {
    const imageDetails: {
        src: string;
        format: string;
        width: number;
        height: number;
    };
    export default imageDetails;
}


declare module '*?carouselPicture' {
    const carouselPicture: {
        src: string;
        srcset: string;
        width: number;
        height: number;
    };
    export default carouselPicture;
}

interface htmlPictureInfo {
    type: "img";
    alt?: string;
    src: string;
    width: number;
    height: number;
    lqip: string;
    sources?: {
        srcset: string,
        type: string
    }[]
}

interface htmlVideoInfo {
    type: "video";
    title?: string;
    formats: { src: string; type: string }[];
    placeholder: {
        src: string;
        width: number;
        height: number;
        lqip: string
    }
}



type carouselMediaInfo = htmlPictureInfo | htmlVideoInfo
