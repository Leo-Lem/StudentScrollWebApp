import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../../lib/hooks"
import { AsyncButton, Label } from "../../../components"

import { createChat, readAllChats } from "../redux"

export default function StartChatButton({ studentId }: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const chatId = useAppSelector(
    (state) => state.chats.chats.find((chat) => chat.participantIds.includes(studentId))?.id
  )
  useEffect(() => {
    if (chatId === undefined) dispatch(readAllChats())
  })

  const openChat = async (): Promise<boolean> => {
    while (chatId === undefined) await dispatch(createChat(studentId))

    navigate(`/chats/${chatId}`)
    return true
  }

  return (
    <AsyncButton action={openChat} variant="contained" fullWidth>
      <Label type="chat" />
    </AsyncButton>
  )
}

interface Props {
  studentId: number
}
