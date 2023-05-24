import { Button, Link } from "@mui/material"

import { useProfile } from "../redux"
import ProfileBadge from "./ProfileBadge"
import { useStudentId } from "../../student"

export default function ProfileLink({ studentId, isSelf, disabled }: Props) {
  const currentStudentId = useStudentId()
  const profile = useProfile(studentId)

  return (
    <Button
      color="inherit"
      component={Link}
      disabled={disabled ?? false}
      href={`/profile/${studentId}`}
      sx={{ padding: 0, borderRadius: 100 }}
    >
      <ProfileBadge profile={profile} isSelf={currentStudentId === studentId} />
    </Button>
  )
}

interface Props {
  studentId: number
  disabled?: boolean
  isSelf?: boolean
}
