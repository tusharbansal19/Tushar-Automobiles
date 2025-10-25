import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    fuelType: "",
    transmission: "",
    stockStatus: "in-stock" as const,
    reviews: 0,
    price: 0,
    discountedPrice: 0,
    id: 0,
    partNumber: "",
    warranty: "",
    imgs: { thumbnails: [], previews: [] },
  } as Product,
} as InitialState;

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
