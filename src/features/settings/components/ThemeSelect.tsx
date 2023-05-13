import { ReactElement } from "react"

import { Binding } from "../../../hooks/useBinding"
import { themes } from "../../../res"
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import ThemeIcon from "./ThemeIcon"

export default function ThemeSelect({ $theme }: Props): ReactElement {
  return (
    <ToggleButtonGroup
      value={$theme.get}
      exclusive
      onChange={(_, newSelection) => {
        if (newSelection !== null) $theme.set(newSelection)
      }}
    >
      {themes.map((theme) => (
        <ToggleButton key={theme} value={theme} sx={{ flex: 1 }}>
          <Stack direction="column" alignItems="center">
            <ThemeIcon theme={theme} />
            <Typography variant="button">{theme}</Typography>
          </Stack>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

interface Props {
  $theme: Binding<string>
}
