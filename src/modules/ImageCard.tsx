import {Flex, Grid, Image, interactivity} from '@chakra-ui/react'
import React, { useState } from 'react'
import {useAppSelector} from "../redux/store";
import {useBreakPoint} from "../useBreakPoint";


interface ImageCardProps {
    resultImage: {
        id: string;
        image: string;
    },
    modalHandler: (resultImage: { id: string; image: string }) => void;
}

export const ImageCard = React.memo(
    ({resultImage, modalHandler}: ImageCardProps ) => {
        const { id, image } = resultImage

        const isMobile = useBreakPoint({ base: true, md: false })
        const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
        const [shareModal, setShareModal] = useState<string | null>(null)

        const useButtonsWithSpread = useBreakPoint({
            base: true,
            md: false,
        })


        const onOpen = () => {
            modalHandler(resultImage)
        }

        const handleSpread = () => {
            if (!isMobile) return
            setDrawerVisible(!drawerVisible)
        }

        return (
            <>
                <Grid
                    templateColumns="1fr"
                    templateRows="1fr 50px"
                    maxW={{ base: '168px', md: '352px', lg: '507px', xl: '600px' }}
                    maxH={{ base: '117px', md: '247px', lg: '356px', xl: '421px' }}
                    borderRadius={'8px'}
                    shadow={'0px 2px 10px rgba(0, 0, 0, 0.05)'}
                    background={'linear-gradient(180deg, #FFF4E8 0%, #FFDAE9 100%)'}
                    role={'group'}
                >
                    <Image
                        gridColumn="1"
                        gridRow="1 / span 2"
                        width={'100%'}
                        height={'100%'}
                        fit={'contain'}
                        src={image}
                        alt={'img'}
                        onClick={onOpen}
                        decoding={'async'}
                    />
                </Grid>

            </>
        )
    },
    (prevProps, nextProps) => prevProps.resultImage.id === nextProps.resultImage.id
)

ImageCard.displayName = 'ImageCard'
