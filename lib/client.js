import { createClient } from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: 'hig44cjz',
    dataset: 'production',
    apiVersion: '2025-03-20',
    useCdn: true,
    token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
