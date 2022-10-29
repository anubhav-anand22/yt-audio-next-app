import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const isLoadingSlice = createSlice({
    name: "IS_LOADING",
    initialState: false,
    reducers: {
        togggleIsLoading(state) {
            return !state
        },
        setLoading(state, action: PayloadAction<boolean>){
            return action.payload
        }
    }
})

export const {togggleIsLoading, setLoading} = isLoadingSlice.actions;
export default isLoadingSlice.reducer