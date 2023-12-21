export interface IStyleable {
    style: React.CSSProperties,
    className: string
};

export const defaultIStyleableProps = {
    style: {},
    className: '',
};

export interface IChildable {
    children: JSX.Element | string | number | undefined
}

export const defaultIChildableProps = {
    children: undefined
};

export interface IResponseData {
    message: string | undefined,
    title: string | undefined
}

interface IInnerImageModel {
    image_url: string,
    large_image_url: string,
    small_image_url: string
}

export interface IImageModel {
    jpg: IInnerImageModel | undefined,
    webp: IInnerImageModel | undefined
}