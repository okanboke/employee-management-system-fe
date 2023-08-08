import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../redux/counterSlice";

export default configureStore({
    reducer: {
        //redux içerisinde tanımlanan counterSlice sınıfı geliyor uygulama içerisinde global olarak kullanılabilir.
        counter: counterSlice,  
    },
});