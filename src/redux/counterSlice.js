import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
    },
    /*
    reducers:{ //fonksiyonlar yazılır Buttonun onClick olayı gibi.
    }*/
})

export default counterSlice.reducer;