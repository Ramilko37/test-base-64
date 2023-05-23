"use client"

import React, {useState} from 'react';
import {Flex, Image, Modal, ModalContent, useDisclosure} from "@chakra-ui/react";
import {images} from '../images'
import {useAppDispatch, useAppSelector} from "../redux/store";
import {addImage} from "../redux/imagesSlice";
import { useRouter } from 'next/navigation'
import {ImageCard} from "./ImageCard";
import {ResultImage} from "../types";
import FullScreenImage from "./FullScreenImage";

const TestPage= () => {
    const dispatch = useAppDispatch()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [reduxImage, setReduxImage] = useState('');
    const [imageId, setImageId] = useState(undefined);
    const [openCard, setOpenCard] = useState<string | undefined>(undefined)

    const imagesFromStore = useAppSelector((state) => state.images.value);

    const imageHandler = (image: any) => {
        dispatch(addImage({id: image.id, image: image.image}))
    }

    const handleOpen = (id: string) => {
        setOpenCard(id)
    }

    const handleClose = () => {
        setOpenCard(undefined)
    }

    const modalHandler = (image: any) => {
        setReduxImage(image.image)
        onOpen()
    }

    return (
        <Flex width={'100%'} direction={'column'}>
            <Flex width={'80%'} margin={'0 auto'}>
                {images.map(image => <Image width={'250px'} height={'350px'}  onClick={() => imageHandler(image)} src={image.image} key={image.id} alt={'img'}/>)}
            </Flex>

            <span>click images to add to store</span>

            <Flex width={'100%'} mt={'100px'}>
                {imagesFromStore.map(image =>
                    <ImageCard resultImage={image} modalHandler={() => handleOpen(image.id)} key={image.id}/>
                )}
            </Flex>
            <span>click images to open modal</span>
            <FullScreenImage
                currentGuid={imageId}
                isOpen={!!openCard}
                selector={state => state.images.value}
                handleClose={handleClose}
            />
        </Flex>
    );
};

export default TestPage;
