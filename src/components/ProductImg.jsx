import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images?.[0]?.url);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square md:w-[500px] md:h-[500px] bg-gray-100 flex items-center justify-center text-gray-400">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-5 w-full lg:w-max">
      {/* Thumbnail Images */}
      <div className="flex sm:flex-col gap-3 sm:gap-5 overflow-x-auto sm:overflow-visible">
        {images.map((img, index) => (
          <img
            key={index}
            onClick={() => setMainImg(img.url)}
            src={img.url}
            alt=""
            className={`cursor-pointer w-14 h-14 sm:w-20 sm:h-20 border shadow-lg object-cover shrink-0 ${
              mainImg === img.url ? "border-pink-600 border-2" : ""
            }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <Zoom>
        <img
          src={mainImg}
          alt=""
          className="w-full aspect-square sm:aspect-auto sm:w-[400px] lg:w-[500px] border shadow-lg object-cover"
        />
      </Zoom>
    </div>
  );
};

export default ProductImg;
