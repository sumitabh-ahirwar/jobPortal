import React from "react";
import { categories } from "@/utils/constants.js";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button.jsx";
function CategoryCarousel() {
  return (
    <div className="">
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className="flex gap-6">
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="flex justify-center">
                <Button className="rounded-full cursor-pointer">{cat}</Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
