import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ResultImage} from "../types";

export interface ResultPromptState {
    value: ResultImage[]
}
const initialState: ResultPromptState = {
    value: []
}

const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        addImage(state, action: PayloadAction<ResultImage>) {
            state.value.push(action.payload);
        },
        getImages(state, action: PayloadAction<ResultImage[]>) {
            state.value = action.payload
        }
    }
})

export const { addImage, getImages } = imagesSlice.actions

export default imagesSlice.reducer
