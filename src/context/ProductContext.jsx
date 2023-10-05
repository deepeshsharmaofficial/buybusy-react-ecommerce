import React, { createContext, useContext, useState, useEffect } from "react";

// Firebase
import {
  collection,
  addDoc,
  query,
  orderBy, // Import orderBy to sort the products
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  increment,
  getDocs,
  writeBatch,
} from "firebase/firestore";

import { firestoreDb } from "../config/firebaseInit";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context API
import { useAuth } from "./AuthContext";

// 1st Step -> Create Context
const ProductContext = createContext();

// 2nd Step -> Create Provider
const ProductProvider = (props) => {

  const [products, setProduct] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const { currentUser } = useAuth();
  const [addRemovecartLoading, setAddRemoveCartLoading] = useState(false);
  const [userCart, setuserCart] = useState([]);
  const [userOrder, setUserOrder] = useState([]);

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
      toast.error("Error in add product");
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
          // console.log("productArray --> ",productArray);
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


  /********** Get User's Cart **********/

  const getUserCart = async () => {
    setProductLoading(true);
    try {
      const cartCollectionRef = collection(firestoreDb, `usersCarts/${currentUser.uid}/myCart`);

      onSnapshot(cartCollectionRef, (querySnapshot) => {
        const cart = [];
        querySnapshot.forEach((doc) => {
          cart.push({ id: doc.id, ...doc.data() });
        });

        setuserCart(cart); // Update the cart state with real-time data
      });

    } catch (error) {
      toast.error("Error getting user's cart");
      console.error("Error getting user's cart:", error);
      return [];
    }
    setProductLoading(false);
  };

  // useEffect(() => {
  //   getUserCart();
  // }, [])


  /********** Add to Cart **********/
  
  const handleAdd = async (product) => {
    setAddRemoveCartLoading(true);

    // Database
    try {
      if (!currentUser) {
        setAddRemoveCartLoading(false);
        toast.error("Please Login!!");
        return;
      }

      // Check if the product is already in the cart
      const cartDocRef = doc(
        firestoreDb,
        `usersCarts/${currentUser.uid}/myCart`,
        product.id
      );
      const cartDocSnapshot = await getDoc(cartDocRef);

      if (cartDocSnapshot.exists()) {
        // If the product is already in the cart, update its quantity
        await setDoc(
          cartDocRef,
          {
            quantity: increment(1),
          },
          { merge: true }
        );
        toast.success("Product increase by 1");

      } else {
        // If the product is not in the cart, add it with a quantity of 1
        await setDoc(cartDocRef, {
          quantity: 1,
          ...product, // Include the entire product object
        });
        toast.success("Product added in cart");
      }
    } catch (error) {
      toast.error("Error adding product to cart");
    }
    setAddRemoveCartLoading(false);
  };


  /********** Handle Remove from Cart **********/

  const handleRemove = async (productId) => {
    setAddRemoveCartLoading(true);
    try {

      if (!currentUser) {
        // Handle the case where currentUser or currentUser.uid is undefined
        setAddRemoveCartLoading(false);
        return;
      }

      // Find the product in the cart
      const cartDocRef = doc( firestoreDb, `usersCarts/${currentUser.uid}/myCart`, productId);

      const cartDocsSnapshot = await getDoc(cartDocRef);

      if (cartDocsSnapshot.exists()) {
        const currentQuantity = cartDocsSnapshot.data().quantity;

        if (currentQuantity > 1) {

          // If the product is greater than 1, decrease its quantity
          await setDoc( cartDocRef, { quantity: increment(-1)}, { merge: true });
          toast.success("Product decrease by 1");
        
        } else {
          // If the product quantity is 1, remove it from the cart
          await deleteDoc(cartDocRef);
          toast.success("Product remove from cart");
        }
      }

    } catch (error) {
      toast.error("Error in removing product from cart");
    }
    setAddRemoveCartLoading(false);
  };

  const TotalCart = (userOrder) => {
    return userOrder.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };
  

  /********** Place an order **********/

  const placeOrder = async () => {
    setProductLoading(true);
    try {
      let orderDate = date.toString() + "-" + month.toString() + "-" + year.toString();
      let newOrder = { userCart, orderDate };
      const ordersCollectionRef = collection(
        firestoreDb,
        `userOrders/${currentUser.uid}/orders`
      );
      await setDoc(doc(ordersCollectionRef), newOrder);

      // Clear the user's cart in the "carts" subcollection
      const cartCollectionRef = collection(
        firestoreDb,
        `usersCarts/${currentUser.uid}/myCart`
      );
      const cartQuerySnapshot = await getDocs(cartCollectionRef);
      const batch = writeBatch(firestoreDb);

      cartQuerySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      // we use a batched write to delete all the documents 
      // within the "myCart" subcollection under the 
      // user's cart, leaving the "usersCarts" document intact.
      
      setuserCart([]);

      toast.success("Order placed successfully !");
    } catch (error) {
      toast.error("Error placing order !");
      console.error("Error placing order:", error);
    }
    setProductLoading(false);
  };


  /********** Get user order history **********/
  const getUserOrderHistory = async () => {
    setProductLoading(true);
    try {
      const ordersCollectionRef = collection(
        firestoreDb,
        `userOrders/${currentUser.uid}/orders`
      );
  
      // Realtime Database
      const q = query(
        ordersCollectionRef,
        orderBy("orderDate", "desc") // Sort by addedDate in descending order
      );
      onSnapshot(q, (querySnapshot) => {
        const orderHistory = [];
  
        querySnapshot.forEach((doc) => {
          orderHistory.push({ id: doc.id, ...doc.data() });
        });
        setUserOrder(orderHistory);
      });
    } catch(error) {
      console.log("Error in order history !!", error);
    }
    setProductLoading(false);

  };

  // useEffect(() => {
  //   getUserOrderHistory();
  // }, []);


  return (
    <ProductContext.Provider
      value={{
        products,
        productLoading,
        handleCreateNewListing,
        minPrice,
        maxPrice,
        handleAdd,
        handleRemove,
        userCart,
        getUserCart,
        TotalCart,
        addRemovecartLoading,
        placeOrder,
        getUserOrderHistory,
        userOrder,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

// 3rd Step -> Custom Hook
const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };