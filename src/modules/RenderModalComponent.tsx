import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useBreakPoint } from '../useBreakPoint'

export interface IRenderModalComponentProps {
  isOpen: boolean
  onClose: () => void
  title: string
  text: string | React.ReactNode
  footerButtons?: React.ReactNode
  hideCloseButton?: boolean
}

export const RenderModalComponent = ({
  isOpen,
  title,
  onClose,
  text,
  footerButtons,
  hideCloseButton,
}: IRenderModalComponentProps) => {
  const isMobile = useBreakPoint({ base: true, md: false })

  const Container = isMobile ? Drawer : Modal
  const Overlay = isMobile ? DrawerOverlay : ModalOverlay
  const Content = isMobile ? DrawerContent : ModalContent
  const Header = isMobile ? DrawerHeader : ModalHeader
  const Body = isMobile ? DrawerBody : ModalBody
  const Footer = isMobile ? DrawerFooter : ModalFooter

  return (
    <Container placement={isMobile ? 'bottom' : undefined} isCentered={!isMobile} isOpen={isOpen} onClose={onClose}>
      <Overlay />
      <Content maxW={'350px'} borderRadius={{ base: '12px 12px 0 0', md: '12px' }} p={'16px'}>
        {!hideCloseButton && (
          <ModalCloseButton
            top={'16px'}
            left={'16px'}
            background={'pink.4'}
            borderRadius={'8px'}
            color={'pink.primary'}
          />
        )}
        <Header
          mt={!hideCloseButton ? '64px' : '0'}
          fontSize={'24px'}
          lineHeight={'28px'}
          fontWeight={600}
          color={'pink.primary'}
          padding={0}
          mb={'4px'}
        >
          {title}
        </Header>
        <Body fontSize={'13px'} lineHeight={'18px'} fontWeight={400} color={'pink.2'} p={0} mb={'32px'}>
          {text}
        </Body>
        <Footer p={0}>{footerButtons}</Footer>
      </Content>
    </Container>
  )
}
