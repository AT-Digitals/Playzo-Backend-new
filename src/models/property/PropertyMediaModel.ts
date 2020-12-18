export enum Mediatype {
    image = "image",
    video = "video"
}

export interface PropertyMediaModel {
    type: Mediatype,
    url: string
}