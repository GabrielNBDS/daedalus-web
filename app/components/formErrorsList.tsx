import { List, ListItem, useMantineTheme } from "@mantine/core";
import type { AdonisErrorItems } from "~/@types/AdonisError";

interface Props {
  errors?: AdonisErrorItems[]
}

export default function FormErrorsList({ errors }: Props) {
  const theme = useMantineTheme()

  return (
    <>
      {errors && (
        <List listStyleType="none">
          {errors?.map(error => 
            <ListItem
              key={error.field}
              sx={{ color: theme.colors.red[6], fontWeight: 'bolder' }} 
            >
              {error.message}
            </ListItem>
          )}
        </List>
      )}
    </>
  )
}