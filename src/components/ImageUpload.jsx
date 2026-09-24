import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const ImageUpload = ({ productData, setProductData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length) {
      setProductData((prev) => ({
        ...prev,
        productImg: [...prev.productImg, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setProductData((prev) => {
      const updatedImages = prev.productImg.filter((_, i) => i !== index);

      return {
        ...prev,
        productImg: updatedImages,
      };
    });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setProductData((prev) => ({
      ...prev,
      productImg: [...prev.productImg, ...files],
    }));
  };

  return (
    <div className="grid gap-2">
      <Label>Product Images</Label>

      <Input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />

      <Button variant="outline" type="button">
        <label htmlFor="file-upload" className="cursor-pointer w-full">
          Upload Images
        </label>
      </Button>

      {/* Image Preview */}
      {productData.productImg.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3">
          {productData.productImg.map((file, idx) => {
            let preview = "";

            // New Uploaded Image
            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            }
            // Existing Image URL
            else if (typeof file === "string") {
              preview = file;
            }
            // Existing Object
            else if (file?.url) {
              preview = file.url;
            } else {
              return null;
            }

            return (
              <Card key={idx} className="relative group overflow-hidden">
                <CardContent className="p-2">
                  <img
                    src={preview}
                    alt="Product"
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-md"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={16} />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
