import { createAsyncThunk } from "@reduxjs/toolkit"

import { tryGettingStudentId } from "../../../lib/redux"
import API, { APIResult } from "../../../lib/API"

import { setSettings } from ".."
import { Settings } from "../../settings"

export default createAsyncThunk("student/readSettings", async (_, thunkAPI) => {
  const result: APIResult<Settings> = await API.get(
    thunkAPI,
    `students/${tryGettingStudentId(thunkAPI)}/settings`
  )

  if (result.ok) thunkAPI.dispatch(setSettings(result.value))
  else console.error(result.error.message)
})
