import React, { type ReactElement } from "react"
import ProfileView from "../features/profiles/components/ProfileView"
import { Box, Stack } from "@mui/material"
import { Navigate, useParams } from "react-router-dom"

export default function ProfilePage(): ReactElement {
  const { studentId } = useParams()

  if (studentId !== undefined && !isNaN(parseInt(studentId)))
    return (
      <Stack direction="column">
        <Box width="35vw" alignSelf="end">
          <ProfileView studentId={parseInt(studentId)} />
        </Box>
      </Stack>
    )
  else {
    return <Navigate to="/" />
  }
}
