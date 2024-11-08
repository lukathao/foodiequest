import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPlan: any = {
  requirements: [
    { description: "Nothing to do yet." },
    { description: "Still nothing to do yet." },
  ],
  foods: [

  ],
  guides: [

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