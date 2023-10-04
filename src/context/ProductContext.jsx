import React, { createContext, useContext, useState, useEffect } from "react";

// Firebase
import {
  collection,
  addDoc,
  query,
  orderBy, // Import orderBy to sort the products
  onSnapshot,
} from "firebase/firestore";

import { firestoreDb } from "../config/firebaseInit";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1st Step -> Create Context
const ProductContext = createContext();

// 2nd Step -> Create Provider
const ProductProvider = (props) => {

  const [products, setProduct] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);


  /********** Find the minimum and maximum prices **********/
  useEffect(() => {
    const calculateMinMaxPrices = () => {
      const prices = products.map((item) => item.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    };

    if (products.length > 0) {
      calculateMinMaxPrices();
    }
  }, [products]); // Add products as a dependency to avoid infinite loop


  //get date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();

  /********** Add new product to database **********/

  const handleCreateNewListing = async (name, category, price, imageURL) => {

    setProductLoading(true);

    try {
 
      await addDoc(collection(firestoreDb, "product"), {
        name,
        category,
        price: Number(price),
        imageURL,
        addedDate : currentDate, // Store the added date
      });
      toast.success("Add product successfully");
    } catch (error) {
      console.log(error);
    }
    setProductLoading(false);
  };


  /********** Get all products from database **********/

  const getAllProduct = async () => {
    setProductLoading(true);

    try {
      const collectionRef = collection(firestoreDb, "product");

      const q = query(
        collectionRef,
        orderBy("addedDate", "desc") // Sort by addedDate in descending order
      );

     // RealTime database
      onSnapshot(q, (querySnapshot) => {
        const productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
          console.log("productArray --> ",productArray);
        });

        setProduct(productArray);     

      });

    } catch (err) {
      console.log(err);
    }

    setProductLoading(false);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        productLoading,
        handleCreateNewListing,
        minPrice,
        maxPrice,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

// 3rd Step -> Custom Hook
const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };