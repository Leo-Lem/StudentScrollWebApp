import { useState, type ReactElement } from "react"

import { Box, Button, Collapse, Stack, TextField, Typography } from "@mui/material"
import { AuthenticationAPI } from "../api"
import { LoadingButton } from "@mui/lab"

export default function AuthenticationForm(): ReactElement {
  const [isRegistering, setIsRegistering] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isNameEmpty, setIsNameEmpty] = useState<boolean | null>(null)
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean | null>(null)
  const [isPasswordTooShort, setIsPasswordTooShort] = useState<boolean | null>(null)
  const [isEmailEmpty, setIsEmailEmpty] = useState<boolean | null>(null)
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  const authenticate = async (): Promise<void> => {
    if (!validate()) return

    setIsLoading(true)

    try {
      if (isRegistering) await AuthenticationAPI.signup({ name, email, password })
      else await AuthenticationAPI.signin({ email, password })
    } catch {
      // TODO: refine error handling and display more information
      setHasFailed(true)
    }

    setIsLoading(false)
  }

  const validate = (): boolean => {
    if (isRegistering && isNameEmpty === null) setIsNameEmpty(true)

    if (isPasswordEmpty === null) setIsPasswordEmpty(true)
    else if (isPasswordTooShort === null) setIsPasswordTooShort(true)

    if (isEmailEmpty === null) setIsEmailEmpty(true)
    else if (isEmailInvalid === null) setIsEmailInvalid(true)

    return !(
      (isRegistering && (isNameEmpty ?? true)) ||
      (isPasswordEmpty ?? true) ||
      (isPasswordTooShort ?? true) ||
      (isEmailEmpty ?? true) ||
      (isEmailInvalid ?? true)
    )
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
              const name = value.trim()
              setName(name)
              setIsNameEmpty(name === "")
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
            const email = value.trim()
            setEmail(email)
            setIsEmailEmpty(email === "")
            setIsEmailInvalid(!/^\S+@\S+\.\S+$/.test(email))
          }}
          error={(isEmailEmpty ?? false) || (isEmailInvalid ?? false)}
          helperText={
            isEmailEmpty ?? false ? "Required" : (isEmailInvalid ?? false) && "Invalid email"
          }
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          autoComplete="new-password"
          onChange={({ target: { value } }) => {
            setPassword(value)
            setIsPasswordEmpty(value === "")
            setIsPasswordTooShort(value.length < 6)
          }}
          error={(isPasswordEmpty ?? false) || (isPasswordTooShort ?? false)}
          helperText={
            isPasswordEmpty ?? false
              ? "Required"
              : (isPasswordTooShort ?? false) && "At least 6 characters"
          }
        />
        <LoadingButton variant="contained" fullWidth onClick={authenticate} loading={isLoading}>
          {isRegistering ? "Sign Up" : "Sign in"}
        </LoadingButton>

        <Typography variant="caption" color="error" hidden={!hasFailed}>
          Something went wrong…
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
