import { useState, type ReactElement } from "react"

import { Box, Button, Collapse, Stack, TextField, Typography } from "@mui/material"
import { createStudent, Login as login } from "../api"

export default function AuthenticationForm(): ReactElement {
  const [isRegistering, setIsRegistering] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isPasswordTooShort, setIsPasswordTooShort] = useState<boolean | null>(null)
  const [isNameEmpty, setIsNameEmpty] = useState<boolean | null>(null)
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null)
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean | null>(null)

  const [hasSignInFailed, setHasSignInFailed] = useState(false)

  const handleSubmit = async (): Promise<void> => {
    if (isRegistering) {
      if (
        (isPasswordTooShort ?? true) ||
        (isEmailEmpty ?? true) ||
        !(isEmailValid ?? false) ||
        (isNameEmpty ?? true)
      )
        return
      await createStudent(name, email, password)
    } else {
      if ((isPasswordTooShort ?? true) || (isEmailEmpty ?? true) || !(isEmailValid ?? false)) return
      try {
        await login(email, password)
      } catch {
        setHasSignInFailed(true)
      }
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Stack spacing={2} marginTop={3}>
        <Collapse in={isRegistering}>
          <TextField
            fullWidth
            label="Your Name"
            autoComplete="name"
            onChange={({ target: { value } }) => {
              setName(value)
              setIsNameEmpty(value === "")
            }}
            error={isNameEmpty ?? false}
            helperText={(isNameEmpty ?? false) && "Required"}
          />
        </Collapse>

        <TextField
          fullWidth
          label="Email"
          autoComplete="email"
          onChange={({ target: { value } }) => {
            setEmail(value)
            setIsEmailValid(value.includes("@") && value.includes("."))
            setIsEmailEmpty(value === "")
          }}
          error={!(isEmailValid ?? true) || (isEmailEmpty ?? false)}
          helperText={
            (!(isEmailValid ?? true) || (isEmailEmpty ?? false)) && "Please enter a valid email"
          }
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          autoComplete="new-password"
          onChange={({ target: { value } }) => {
            setPassword(value)
            setIsPasswordTooShort(value.length < 6)
          }}
          error={isPasswordTooShort ?? false}
          helperText={(isPasswordTooShort ?? false) && "Password must be at least 6 characters"}
        />

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          {isRegistering ? "Sign Up" : "Sign in"}
        </Button>

        <Typography variant="caption" color="error" hidden={!hasSignInFailed}>
          Sign in failed. Please try again.
        </Typography>

        <Button
          variant="text"
          size="small"
          onClick={() => {
            setIsRegistering(!isRegistering)
          }}
        >
          <Typography variant="caption">
            {isRegistering ? "Already registered? Sign in" : "No account yet? Sign up"}
          </Typography>
        </Button>
      </Stack>
    </Box>
  )
}
