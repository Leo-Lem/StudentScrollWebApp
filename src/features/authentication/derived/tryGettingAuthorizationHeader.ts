import { signOut } from ".."
import { type RootState } from "../../../redux"

export default function tryGettingAuthorizationHeader(thunkAPI: any): string {
  const state = thunkAPI.getState() as RootState

  if (state.authentication.token === undefined) {
    thunkAPI.dispatch(signOut())
    throw new Error("No token found")
  }

  return `Bearer ${state.authentication.token}`
}
