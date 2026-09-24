import FilterSidebar from "@/components/FilterSidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const { products } = useSelector((store) => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5555/api/v1/product/getallproducts",
      );
      // console.log(res.data);
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1],
    );

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="pt-32 pb-10 px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* Sidebar - Desktop */}
        <FilterSidebar
          allProducts={allProducts}
          priceRange={priceRange}
          search={search}
          setSearch={setSearch}
          brand={brand}
          category={category}
          setCategory={setCategory}
          setPriceRange={setPriceRange}
          setBrand={setBrand}
        />

        {/* Sidebar - Mobile Drawer */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-30 md:hidden">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowMobileFilter(false)}
            />
            {/* drawer panel */}
            <div className="absolute left-0 top-0 h-full w-72 bg-white overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setShowMobileFilter(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterSidebar
                allProducts={allProducts}
                priceRange={priceRange}
                search={search}
                setSearch={setSearch}
                brand={brand}
                category={category}
                setCategory={setCategory}
                setPriceRange={setPriceRange}
                setBrand={setBrand}
                forceShow={true}
              />
            </div>
          </div>
        )}

        {/* Main Product Section */}
        <div className="flex flex-col flex-1">
          {/* Sort By + Mobile Filter Button */}
          <div className="flex justify-between md:justify-end items-center mb-6 gap-3">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="md:hidden flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value)}
            >
              <SelectTrigger className="w-[150px] md:w-[200px]">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
