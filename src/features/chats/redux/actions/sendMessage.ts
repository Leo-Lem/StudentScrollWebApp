import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"

import { addMessages } from ".."
import Message from "../../types/Message"

export default createAsyncThunk(
  "chats/sendMessage",
  async (request: { chatId: number; content: string }, thunkAPI) => {
    const result: APIResult<Message> = await API.post(
      thunkAPI,
      `chats/${request.chatId}/messages`,
      request.content
    )

    if (result.ok)
      thunkAPI.dispatch(addMessages({ chatId: request.chatId, messages: [result.value] }))
    else console.error(result.error)
  }
)
