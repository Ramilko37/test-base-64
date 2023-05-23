import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface Image {
    id: string;
    image: string;
}

const initialState: Image[] = []

const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        addImage(state, action: PayloadAction<Image>) {
            state.push(action.payload);
        },
        getImages(state, action: PayloadAction<Image[]>) {
            return action.payload
        }
    }
})

export const { addImage, getImages } = imagesSlice.actions

export default imagesSlice.reducer
