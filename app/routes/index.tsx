import { Switch, useMantineColorScheme } from "@mantine/core";

export default function Index() {
  const { colorScheme ,toggleColorScheme } = useMantineColorScheme();

  return (
    <Switch
      checked={colorScheme === 'dark'}
      label="Dark theme"
      onClick={() => toggleColorScheme()}
    />
  );
}