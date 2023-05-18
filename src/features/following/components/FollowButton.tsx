import { useEffect } from "react"

import { AsyncToggle, Label } from "../../../components"
import { useAppDispatch, useAppSelector } from "../../../redux"

import { follow, readFollows, unfollow } from "../redux"

export default function FollowButton({ followId }: Props) {
  const dispatch = useAppDispatch()

  const studentId = useAppSelector((state) => state.authentication.studentId)

  if (studentId === undefined) throw new Error("Not authenticated")

  const isFollowing = useAppSelector(
    (state) => state.following[studentId]?.follows?.includes(followId) ?? false
  )

  const handleFollow = async (): Promise<boolean> => {
    await dispatch(follow(followId))
    return true
  }

  const handleUnfollow = async (): Promise<boolean> => {
    await dispatch(unfollow(followId))
    return true
  }

  useEffect(() => {
    void dispatch(readFollows(studentId))
  }, [])

  return (
    <AsyncToggle selected={isFollowing} action={isFollowing ? handleUnfollow : handleFollow}>
      <Label type={isFollowing ? "unfollow" : "follow"} display="iconOnly" />
    </AsyncToggle>
  )
}

interface Props {
  followId: number
}
