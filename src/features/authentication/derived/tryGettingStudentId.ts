import { signOut } from ".."
import { type RootState } from "../../../app/store"

export default function tryGettingStudentId(thunkAPI: any): number | undefined {
  const state = thunkAPI.getState() as RootState

  if (state.authentication.studentId === undefined) thunkAPI.dispatch(signOut())

  return state.authentication.studentId
}
