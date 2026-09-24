import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { setProducts } from '@/redux/productSlice'
import axios from 'axios'
import { Edit, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/ImageUpload'


const AdminProduct = () => {
  const { products } = useSelector(store => store.product)
  const [sortOrder, setSortOrder] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [editProduct, setEditProduct] = useState(null)
  const [open, setOpen] = useState(false)
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()

  let filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.productPrice - b.productPrice)
  }
  if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.productPrice - a.productPrice)
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("category", editProduct.category);
    formData.append("brand", editProduct.brand);

    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });

    try {
      const res = await axios.put(
        `http://localhost:5555/api/v1/product/update/${editProduct._id}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        setOpen(false)
        const updatedProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p
        );
        dispatch(setProducts(updatedProducts));
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter((product) => product._id !== productId)
      const res = await axios.delete(`http://localhost:5555/api/v1/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setProducts(remainingProducts))
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='lg:pl-[200px] px-4 lg:px-0 lg:pr-20 py-6 md:py-20 flex flex-col gap-3 min-h-screen bg-gray-100'>
      <div className='flex flex-col sm:flex-row gap-3 sm:justify-between'>
        <div className='relative bg-white rounded-lg w-full sm:w-auto'>
          <Input type="text"
            placeholder="Search Product..."
            className="w-full sm:w-[400px] items-center"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
          <Search className='absolute right-3 top-1.5 text-gray-500' />
        </div>

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="highToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {
        filteredProducts.map((product, index) => {
          return <Card key={index} className='px-3 md:px-4 py-3'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between'>
              <div className='flex gap-2 items-center min-w-0'>
                <img src={product.productImg[0]?.url} alt="" className='w-16 h-16 md:w-25 md:h-25 rounded-md object-cover shrink-0' />
                <h1 className='font-bold w-full sm:w-96 text-gray-700 text-sm md:text-base truncate'>{product.productName}</h1>
              </div>
              <div className='flex items-center justify-between sm:justify-end gap-4 sm:gap-6'>
                <h1 className='font-semibold text-gray-800 text-sm md:text-base'>₹{product.productPrice}</h1>
                <div className='flex gap-3'>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Edit onClick={() => { setOpen(true), setEditProduct(product) }} className='text-green-500 cursor-pointer w-5 h-5 md:w-6 md:h-6' />
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] sm:max-w-[625px] max-h-[85vh] overflow-y-scroll">
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                          Make changes to your product here. Click save when you&apos;re
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-2">
                        <div className="grid gap-2">
                          <Label>Product Name</Label>
                          <Input
                            type="text"
                            name="productName"
                            value={editProduct?.productName}
                            onChange={handleChange}
                            placeholder="Ex-Iphone"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Price</Label>
                          <Input
                            type="number"
                            name="productPrice"
                            value={editProduct?.productPrice}
                            onChange={handleChange}
                            placeholder=""
                            required
                          />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                          <div className="grid gap-2">
                            <Label>Brand</Label>
                            <Input
                              type="text"
                              name="brand"
                              value={editProduct?.brand}
                              onChange={handleChange}
                              placeholder="Ex-apple"
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Category</Label>
                            <Input
                              type="text"
                              name="category"
                              value={editProduct?.category}
                              onChange={handleChange}
                              placeholder="Ex-Mobile"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label>Description</Label>
                          </div>
                          <Textarea
                            name="productDesc"
                            value={editProduct?.productDesc}
                            onChange={handleChange}
                            placeholder="Enter brief description of product"
                          />
                        </div>
                        <ImageUpload productData={editProduct} setProductData={setEditProduct} />
                      </div>
                      <DialogFooter className="flex-col sm:flex-row gap-2">
                        <DialogClose asChild>
                          <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSave} type="submit" className="w-full sm:w-auto">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {/* -----------------X----------------- */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Trash2 className='text-red-500 cursor-pointer w-5 h-5 md:w-6 md:h-6' />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[90vw] sm:max-w-lg">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          product and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteProductHandler(product._id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </Card>
        })
      }
    </div>
  )
}

export default AdminProduct