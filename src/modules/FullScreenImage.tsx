import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Center,
  Flex,
  Grid,
  Img,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react'
import {ResultImage} from "../types";
import {CardHandlers} from "./ImageCard";
import {useAppSelector} from "../redux/store";
import {ShareImageModal} from "./ShareImageModal";
import {CloseIcon} from "@chakra-ui/icons";
import {CombinedState} from "redux";
import {useBreakPoint} from "../useBreakPoint";
import {LeftArrowIcon} from "../../public/left-arrow";
import { useSwipeable } from 'react-swipeable'


interface IFullScreenImageProps {
  currentGuid?: string
  handleClose: () => void
  handleOpen?: () => void
  isOpen: boolean
  handlers?: CardHandlers
  hideLikeButton?: boolean
  selector: (state: CombinedState<any>) => ResultImage[]
}

const FullScreenImage = ({
  isOpen,
  handleClose,
  selector,
  currentGuid,
  handlers,
  hideLikeButton = false,
}: IFullScreenImageProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined)
  const images = useAppSelector(selector, (a, b) => a.length === b.length)

  const currentImage = useMemo(() => {
    if (currentIndex) return images[currentIndex]
    return images.find(x => x.id === currentGuid) ?? images[0]
  }, [images, currentIndex, currentGuid])


  const isMobile = useBreakPoint({ base: true, sm: false })
  const [shareModal, setShareModal] = useState<string | null>(null)
  const [isLandscape] = useMediaQuery('(orientation: landscape)')

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handlePrev(),
    onSwipedRight: () => handleNext(),
  })

  const handleKey = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      return handleNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      return handlePrev()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  const handleNext = () => {
    let index = images.findIndex(x => x === currentImage)
    if (index === images.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(index + 1)
    }
  }

  const handlePrev = () => {
    let index = images.findIndex(x => x === currentImage)
    if (index === 0) {
      setCurrentIndex(images.length - 1)
    } else {
      setCurrentIndex(index - 1)
    }
  }

  const onClose = () => {
    setCurrentIndex(undefined)
    handleClose()
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={true} closeOnOverlayClick={true} size={'full'}>
      <ModalOverlay>
      <ModalContent p={{ base: '11px', sm: '24px' }} h={'100dvh'}>
        <Flex
          {...swipeHandlers}
          w={'100%'}
          flex={'1'}
          justifyContent={'space-between'}
          alignItems={'center'}
          userSelect={'none'}
        >
          {!isMobile && <LeftArrowIcon cursor={'pointer'} onClick={handlePrev} />}
          <Grid
            gridTemplateRows={{ base: 'auto 1fr auto', sm: '1fr auto' }}
            height={'100%'}
            alignItems={'stretch'}
            width={'100%'}
            justifyContent={'center'}
          >
            {isMobile && (
              <Center>
                <Text variant={'t2'} color={'pink.primary'}>
                  Swipe to see other designs
                </Text>
              </Center>
            )}
            <Flex flexDirection={'column'} justifyContent={'center'} gap={'16px'}>
              <Button variant={'secondary'} size={'onlyIcon'} leftIcon={<CloseIcon />} onClick={onClose} />
              <Image
                src={currentImage?.image}
                objectFit={'contain'}
                decoding={'async'}
                maxH={isLandscape ? '60vh' : '70vh'}
              />
            </Flex>
          </Grid>
          {!isMobile && <LeftArrowIcon transform={'rotate(180deg)'} cursor={'pointer'} onClick={handleNext} />}
        </Flex>
      </ModalContent>
      </ModalOverlay>
      {<ShareImageModal isOpen={!!shareModal} shareUrl={shareModal ?? ''} onClose={() => setShareModal(null)} />}
    </Modal>
  )
}

export default FullScreenImage
