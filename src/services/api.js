

// 'use server'

// import { client } from "@/sanity/lib/client"

// async function uploadImageToSanity(imageUrl: any){
//     const response = await fetch(imageUrl)
//     const blob = await response.blob()
//     const asset = await client.assets.upload('image', blob);
//     return asset._id; //Asset reference
// }

// export async function fetchData(){
//     const response = await fetch("https://next-ecommerce-template-4.vercel.app/api/product")
        
   
//     const data = await response.json()
//     const products = data.products

//     for (const item of products){

//        const imageAsset = await uploadImageToSanity(item.imagePath)

//        const sanityItem = {
//         _id: item.id,
//         _type: 'cards',
//         name: item.name,
//         category: item.category || null,
//         price: item.price,
//         description: item.description || '',
//         discountPercentage: item.discountPercentage || 0,
//         stockLevel: item.stockLevel || 0,
//         isFeaturedCard: item.isFeaturedProduct,
//         image: {
//               _type: 'image',
//               asset: {
//                 _type: 'reference',
//                 _ref: imageAsset,
//               },
//             }
         
//       };

//       await client.createOrReplace(sanityItem) 
// }
// }




// import { createClient } from '@sanity/client';
// import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
//   token: process.env.SANITY_API_TOKEN || '',
//   apiVersion: '2023-01-01',
//   useCdn: false,
// });

// async function uploadImageToSanity(imageUrl: string): Promise<string | null> {
//   try {
//     console.log(`Uploading Image: ${imageUrl}`);
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//     const buffer = Buffer.from(response.data);
//     const asset = await client.assets.upload('image', buffer, {
//       filename: imageUrl.split('/').pop() || 'image',
//     });
//     console.log(`Image Uploaded Successfully: ${asset._id}`);
//     return asset._id;
//   } catch (error) {
//     console.error(`Failed to Upload Image: ${imageUrl}`, error);
//     return null;
//   }
// }

// async function importData() {
//   try {
//     console.log('Fetching product data from API...');
//     const response = await axios.get('https://next-ecommerce-template-4.vercel.app/api/product');
//     const products = response.data.products;

//     for (const item of products) {
//       console.log(`Processing Item: ${item.name}`);
//       let imageRef = null;

//       if (item.imagePath) {
//         imageRef = await uploadImageToSanity(item.imagePath);
//       }

//       const sanityItem = {
//         _type: 'cards',
//         name: item.name,
//         category: item.category || null,
//         price: item.price,
//         description: item.description || '',
//         discountPercentage: item.discountPercentage || 0,
//         stockLevel: item.stockLevel || 0,
//         isFeaturedCard: item.isFeaturedProduct,
//         image: imageRef
//           ? {
//               _type: 'image',
//               asset: {
//                 _type: 'reference',
//                 _ref: imageRef,
//               },
//             }
//           : undefined,
//       };

//       console.log(`Uploading ${sanityItem.name} to Sanity...`);
//       const result = await client.create(sanityItem);
//       console.log(`Uploaded Successfully: ${result._id}`);
//     }

//     console.log('Data import completed successfully!');
//   } catch (error) {
//     console.error('Error importing data:', error);
//   }
// }

// importData();


import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-15',
  useCdn: false,
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading Image : ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image Uploaded Successfully : ${asset._id}`);
    return asset._id;
  } 
  catch (error) {
    console.error('Failed to Upload Image:', imageUrl, error);
    return null;
  }
}

 export async function importData() {
  try {
    console.log('Fetching Product Data From API ...');

    const response = await axios.get("https://next-ecommerce-template-4.vercel.app/api/product")
    const products = response.data.products;

    for (const item of products) {
      console.log(`Processing Item: ${item.name}`);

      let imageRef = null;
      if (item.imagePath) {
        imageRef = await uploadImageToSanity(item.imagePath);
      }

      const sanityItem = {
        _type: 'product',
        name: item.name,
        category: item.category || null,
        price: item.price,
        description: item.description || '',
        discountPercentage: item.discountPercentage || 0,
        stockLevel: item.stockLevel || 0,
        isFeaturedProduct: item.isFeaturedProduct,
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };

      console.log(`Uploading ${sanityItem.category} - ${sanityItem.name} to Sanity !`);
      const result = await client.create(sanityItem);
      console.log(`Uploaded Successfully: ${result._id}`);
      console.log("----------------------------------------------------------")
      console.log("\n\n")
    }

    console.log('Data Import Completed Successfully !');
  } catch (error) {
    console.error('Error Importing Data : ', error);
  }
}

importData();