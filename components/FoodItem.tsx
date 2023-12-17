'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

interface FoodItemProps {
  name: string;
  price: string;
  description: string;
  image_url?: string;
  ingredients: string;
}

export const FoodItem: React.FC<FoodItemProps> = ({ name, price, description, image_url, ingredients }) => {
  const onImageError = (e) => {
    e.target.src = 'https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98='
  }
  return (
    
    <Card>
      <div className="relative">
        {image_url && (
          <CardHeader>
            <img className="w-full h-48 object-cover rounded-t-lg"
             src={image_url} 
             alt={name}
             onError={onImageError }
             />
          </CardHeader>
        )}
        <CardContent>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <ul className="text-sm font-light list-disc list-inside">
            <li>
              <strong>Ingredients:</strong> {ingredients}
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-sm font-bold text-right">Price: ${price}</p>
        </CardFooter>
      </div>
    </Card>
  );
};