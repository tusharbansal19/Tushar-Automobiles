import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    title: "",
    brand: "",
    category: "",
    vehicleType: "",
    company: "",
    model: "",
    variant: "",
    fuelType: "",
    transmission: "",
    reviews: 0,
    price: 0,
    discountedPrice: 0,
    id: 0,
    partNumber: "",
    warranty: "",
    stockStatus: "out-of-stock" as const,
    compatibleVehicles: [],
    specifications: {},
    imgs: { thumbnails: [], previews: [] },
  },
} as InitialState;

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;
