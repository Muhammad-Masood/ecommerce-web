import { StaticImageData } from "next/image"

export type HeroSecData = {
    label: string;
    heading: string;
    subHeading: string;
    image: Image;
    bgColor: string;
}

export type PromotionData = {
    title: string;
    banners: Image[];
}

export type FeaturedData = {
    title: string;
}

type Image = {
    asset: {
        url: string
    }
}

type Size = {
    name: string
}

export type Category = {
    id: string
    name: string
}


export type Product = {
    _rev: string,
    name: string,
    description: string,
    category: Category,
    subCategory: Category,
    size: Size[],
    main_image: Image,
    images: Image[], 
    isSoldOut: boolean,
    isFavourite: boolean,
    price: number,
    subTotal:number
    quantity: number
}