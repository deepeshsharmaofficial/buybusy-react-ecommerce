import React, { useState } from 'react'

// Component
import MySpinner from '../components/MySpinner';
import ProductCard from '../components/ProductCard';

// Context API
import { useProduct } from '../context/ProductContext';

const Home = () => {
  const {products, productLoading, minPrice, maxPrice } = useProduct();
  const [searchVal, setSearchVal] = useState("");
  const [priceFilter, setPriceFilter] = useState(1000000000);

  // Filter by Categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSetPriceFilter = (e) => {
    setPriceFilter(Number(e.target.value));
  }

  const handleCategoryCheckboxChange = (e) => {
    const category = e.target.value;
    if (e.target.checked) {

      // Add category to the selectedCategories array
      setSelectedCategories([...selectedCategories, category]);
    } else {
      // Remove category from the selectedCategories array
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const filteredProductList = products
  .filter((item) => {
    if (searchVal.trim() === "") {
      return true;
    }
    if (item.name.toLowerCase().includes(searchVal.toLowerCase())) {
      return item;
    }
  })
  .filter((product) => {
    // Filter by price
    return product.price <= priceFilter;
  })
  .filter((product) => {
      // Filter by selected categories
      if (selectedCategories.length == 0) {
        return true;  // No category filters selected, show all products
      }
      return selectedCategories.includes(product.category);
  })


  return (
    <>
      { productLoading || products.length === 0 ?
        
       ( <MySpinner />
      
      ) : (
      
      <div className="container mb-5" style={{ marginTop: "80px"}}>
               
        <h3 className="text-center mb-4">All Products</h3>

        <div className="row justify-content-center">
          <div className="col-lg-5 mb-5">
            <input
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              onChange={e => setSearchVal(e.target.value)} 
              />

          </div>
        </div>
        
        <div className="row">
        
          <div className="col-lg-2 pe-3 mb-4">
            <h4 className="fw-semibold mb-4 "> Filter </h4>

            <div className="input-group mb-3">
              <label htmlFor ="customRange1" className="form-label fw-semibold text-muted">Price : ₹{priceFilter}</label>
              <input
                type="range"
                className="form-range"
                id="customRange1"
                min={minPrice}
                max={maxPrice}
                step="10"
                value={priceFilter}
                onChange={handleSetPriceFilter}
              />
            </div>

            <p className="fw-semibold text-muted"> Category </p>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Men's Clothing" 
                id="Men"
                onChange={handleCategoryCheckboxChange} 
              />
              <label className="form-check-label" htmlFor ="Men">
                Men's Clothing
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Women's Clothing" 
                id="Women"
                onChange={handleCategoryCheckboxChange} 
              />
              <label className="form-check-label" htmlFor ="Women">
                Women's Clothing
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Jewelery" 
                id="Jewelery"
                onChange={handleCategoryCheckboxChange} 
              />
              <label className="form-check-label" htmlFor ="Jewelery">
                Jewelery
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Electronics" 
                id="Electronics"
                onChange={handleCategoryCheckboxChange} 
              />
              <label className="form-check-label" htmlFor ="Electronics">
                Electronics
              </label>
            </div>

          </div>

          <div className="col-lg-10">
              <div className="row g-3">
                {filteredProductList?.map((p) => (
                  <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                    <ProductCard key={p.id} id={p.id} {...p} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        
      </div>

        )
    }
    </>
    )
}

export default Home;