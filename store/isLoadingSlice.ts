import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const isLoadingSlice = createSlice({
    name: "IS_LOADING",
    initialState: {value: false, message: ""},
    reducers: {
        togggleIsLoading(state) {
            return {value: !state.value, message: ""}
        },
        setLoading(state, action: PayloadAction<{value: boolean, message: string}>){
            return action.payload
        }
    }
})

export const {togggleIsLoading, setLoading} = isLoadingSlice.actions;
export default isLoadingSlice.reducer