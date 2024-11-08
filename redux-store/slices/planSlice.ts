import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPlan: any = {
  requirements: [
    { description: "Nothing to do yet." },
    { description: "Still nothing to do yet." },
  ],
  foods: [
    {
      name: "Phở",
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Phở_bò_gà.jpg"
    },
    {
      name: "Bánh Mì",
      url: "https://upload.wikimedia.org/wikipedia/commons/7/76/Banh_mi_1.jpg"
    }
  ],
  guides: [
    {
      name: "Hanoi Local Tour Guide",
      contact: "+84 123 456 789",
      website: "www.hanoilocalguides.com"
    },
    {
      name: "Vietnam Discovery",
      contact: "+84 987 654 321",
      website: "www.vietnamdiscovery.com",
    }
  ],
  activities: [
    {
      order: 0,
      description: "Nothing here."
    },
    {
      order: 1,
      description: "Fill out this app."
    }
  ],
};

const planSlice = createSlice({
  name: 'plans',
  initialState: initialPlan,
  reducers: {
    addPlan: (state, action: PayloadAction<any>) => {
      state.plan = action.payload;
    }
  }
});

export const { addPlan } = planSlice.actions;

export default planSlice.reducer;