import React, { useState } from 'react'

import { Button, Flex, Text } from '@chakra-ui/react'

import { debounce } from 'debounce'
import {RenderModalComponent} from "./RenderModalComponent";
import {DoneIcon} from "../../public/done-icon";
import {LinkIcon} from "../../public/link-icon";

interface IShareImageModalComponentProps {
  shareUrl: string
  isOpen: boolean
  onClose: () => void
}
export const ShareImageModal = ({ shareUrl, isOpen, onClose }: IShareImageModalComponentProps) => {
  const [copied, setCopied] = useState<boolean>(false)

  const copiedButtonStyle = copied
    ? {
        backgroundColor: 'green',
        _hover: { backgroundColor: 'green' },
      }
    : { backgroundColor: 'pink.primary' }

  const copyUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    changeButtonState()
  }

  const debounceFoo = debounce(() => setCopied(false), 2000)

  const changeButtonState = () => {
    setCopied(true)
    debounceFoo()
  }

  const handleClose = () => {
    setCopied(false)
    onClose()
  }

  return (
    <RenderModalComponent
      isOpen={isOpen}
      onClose={handleClose}
      title={'Share'}
      text={
        <Flex
          width={'100%'}
          background={'pink.5'}
          padding={'12px 10px'}
          borderRadius={'12px'}
          border={'1px solid #FBE9F0'}
        >
          <Text variant={'t2'}>{shareUrl}</Text>
        </Flex>
      }
      footerButtons={
        <Button
          w={'100%'}
          variant={'primary'}
          {...copiedButtonStyle}
          leftIcon={copied ? <DoneIcon /> : <LinkIcon />}
          onClick={copyUrl}
        >
          {copied ? 'Copied' : 'Сopy Link'}
        </Button>
      }
    />
  )
}
