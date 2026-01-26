import React from "react";
import { categories } from "@/utils/constants.js";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button.jsx";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";
function CategoryCarousel() {
  const navigate = useNavigate()
    const handleClick = (searchQuery) => {
        navigate(`/browse?query=${searchQuery}`);
    }
  return (
    <div className="">
      <Carousel className="w-full max-w-xl mx-auto my-20 rounded-2xl"
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 1000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      >
        <CarouselContent className="flex gap-6">
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="flex justify-center">
                <Button onClick={() => handleClick(cat)} className="rounded-full cursor-pointer">{cat}</Button>
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
