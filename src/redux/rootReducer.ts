import { combineReducers } from '@reduxjs/toolkit'
import imagesReducer from "./imagesSlice";

export const rootReducer = combineReducers({
    images: imagesReducer
})

export type RootState = ReturnType<typeof rootReducer>
