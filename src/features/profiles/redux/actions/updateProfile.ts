import { createAsyncThunk } from "@reduxjs/toolkit"

import API, { APIResult } from "../../../../lib/API"
import { tryGettingStudentId } from "../../../../lib/redux"

import { addProfile } from ".."
import Profile from "../../types/Profile"

export default createAsyncThunk(
  "profile/updateProfile",
  async (info: { newName?: string; newBio?: string; newIcon?: string }, thunkAPI) => {
    const result: APIResult<Profile> = await API.put(thunkAPI, "students", info)

    if (result.ok)
      thunkAPI.dispatch(
        addProfile({ studentId: tryGettingStudentId(thunkAPI), profile: result.value })
      )
    else console.error(result.error.message)
  }
)
