"use client"

import React, {useState} from 'react';
import {Flex, Image, Modal, ModalContent, useDisclosure} from "@chakra-ui/react";
import {images} from '../images'
import {useAppDispatch, useAppSelector} from "../redux/store";
import {addImage} from "../redux/imagesSlice";
import { useRouter } from 'next/navigation'
import {ImageCard} from "./ImageCard";

const TestPage= () => {
    const dispatch = useAppDispatch()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [reduxImage, setReduxImage] = useState('');
    const imagesFromStore = useAppSelector((state) => state.images);

    const imageHandler = (image: any) => {
        dispatch(addImage({id: image.id, image: image.image}))
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
                    <ImageCard resultImage={image} modalHandler={() => modalHandler(image)}/>
                )}
            </Flex>
            <span>click images to open modal</span>
            {
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalContent >
                        <Image src={reduxImage} key={1} alt={'reduximg'} fill={'auto'}/>
                    </ModalContent>
                </Modal>
            }
        </Flex>
    );
};

export default TestPage;
