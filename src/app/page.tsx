import { importData } from "@/services/api";
import Cards from "./components/cards";
import { client } from "@/sanity/lib/client";
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


interface Res {
  name: string;
  description: string;
  price: string;
  stockLevel: number;
  category: string;
  isFeaturedProduct: boolean;
  discountPercentage: number;
  image: string;
}

export default async function Home() {
  // await fetchData()

 
const response: Res[] = await client.fetch(`*[_type == 'product'][]{
  name,
  description,
  price,
  stockLevel,
  category,
  isFeaturedProduct,
  discountPercentage,
  'image' : image.asset->url,
}`)

console.log(response);


  await importData()
  return (
    // <div className="grid grid-cols-3 gap-4 py-10" >
    //   {response.map((product: Res, index: number)=>{
    //     return (
    //       <Card className=" max-w-sm border rounded-lg shadow-lg" key={index}>
    //   <CardHeader className="p-4">
    //     {product.isFeaturedProduct && (
    //       <Badge className="absolute top-4 left-4">Featured</Badge>
    //     )}
    //     <Image
    //       src={product.image}
    //       alt={product.name}
    //       width={300}
    //       height={300}
    //       className=" object-cover rounded-t-lg"
    //     />
    //   </CardHeader>

    //   <CardContent className="p-4">
    //     <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
    //     <p className="text-sm text-gray-600 my-2">{product.description}</p>

    //     <div className="flex justify-between items-center my-3">
    //       <span className="text-lg font-bold text-gray-800">${product.price}</span>
    //       {product.discountPercentage > 0 && (
    //         <span className="text-sm text-red-500">{product.discountPercentage}% Off</span>
    //       )}
    //     </div>

    //     <div className="text-sm text-gray-500">
    //       <p>Category: <span className="font-medium">{product.category}</span></p>
    //       <p>Stock Level: <span className="font-medium">{product.stockLevel}</span></p>
    //     </div>
    //   </CardContent>

    //   <CardFooter className="p-4">
    //     <Button variant="default" disabled={product.stockLevel === 0} className="w-full">
    //       {product.stockLevel > 0 ? "Add to Cart" : "Out of Stock"}
    //     </Button>
    //   </CardFooter>
    // </Card>
    //     )
    //   })}

    // </div>


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-4">
  {response.map((product: Res, index: number) => (
    <Card
      className="max-w-sm border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      key={index}
    >
      <CardHeader className="relative p-4">
        {product.isFeaturedProduct && (
          <Badge className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-md shadow">
            Featured
          </Badge>
        )}
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover rounded-t-lg w-full h-56"
        />
      </CardHeader>

      <CardContent className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 my-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center my-3">
          <span className="text-lg font-bold text-gray-800">
            ${product.price}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-red-500 bg-red-100 px-2 py-1 rounded-md">
              {product.discountPercentage}% Off
            </span>
          )}
        </div>

        <div className="text-sm text-gray-500">
          <p>
            Category:{" "}
            <span className="font-medium text-gray-700">
              {product.category}
            </span>
          </p>
          <p>
            Stock Level:{" "}
            <span
              className={`font-medium ${
                product.stockLevel > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.stockLevel}
            </span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          variant="default"
          disabled={product.stockLevel === 0}
          className={`w-full ${
            product.stockLevel > 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          } transition-colors duration-300`}
        >
          {product.stockLevel > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>

  );
}

















