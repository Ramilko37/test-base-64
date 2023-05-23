import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, useDisclosure, VStack, Text } from '@chakra-ui/react'
import {LikeIcon} from "../../public/like-icon";
import {ShareIcon} from "../../public/share-icon";
import {FindIcon} from "../../public/find-icon";
import {DeleteIcon} from "../../public/delete-icon";
import {DownloadIcon} from "../../public/download-icon";



export interface ImageButtonsDrawerProps {
  isFavorite?: boolean
  downloadUrl?: string
  handleLike?: () => Promise<void>
  handleShare?: () => Promise<void>
  handleFind?: () => Promise<void>
  handleDelete?: () => void
  handleSpread?: () => void
  drawerVisible: boolean
  isLiked?: boolean
  hideLikeButton?: boolean
}

export const ImageButtonsDrawer = ({
  handleFind,
  handleLike,
  handleShare,
  handleSpread,
  handleDelete,
  drawerVisible,
  downloadUrl,
  isLiked,
  hideLikeButton = false,
}: ImageButtonsDrawerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const footerIcons = [
    !hideLikeButton
      ? {
          icon: <LikeIcon boxSize={'1em'} />,
          description: 'Favorites',
          handler: handleLike,
          props: { isActive: isLiked },
        }
      : {},
    {
      icon: <DownloadIcon boxSize={'1em'} />,
      description: 'Save',
      props: { download: 'magic-image.jpg', href: downloadUrl, as: 'a' } as unknown,
    }, // todo сделать с норм типами и гуидом
    { icon: <ShareIcon boxSize={'1em'} />, description: 'Share', handler: handleShare },
    { icon: <FindIcon boxSize={'1em'} />, description: 'Find', handler: handleFind },
    { icon: <DeleteIcon boxSize={'1em'} />, description: 'Delete', handler: handleDelete },
  ]

  const buttons = footerIcons
    .filter(x => !!x?.icon)
    .map(item => {
      return (
        <VStack key={item.description} width={'62px'} height={'64px'}>
          <Button
            borderRadius={'50%'}
            width={'40px'}
            height={'40px'}
            variant={'secondary'}
            size={'onlyIconS'}
            onClick={item.handler}
            {...(item.props ?? {})}
          >
            {item.icon}
          </Button>
          <Text>
            {item.description}
          </Text>
        </VStack>
      )
    })

  return (
    <Drawer
      closeOnOverlayClick={true}
      onOverlayClick={handleSpread}
      closeOnEsc={true}
      placement={'bottom'}
      onClose={onClose}
      isOpen={drawerVisible}
    >
      <DrawerOverlay />
      <DrawerContent borderTopRadius={'12px'}>
        <DrawerBody justifyContent={'center'} padding={'24px'} display={'flex'}>
          {buttons}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
