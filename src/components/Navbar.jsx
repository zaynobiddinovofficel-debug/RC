import { Flex, Heading, Button, useColorMode } from "@chakra-ui/react";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      justify="space-between"
      align="center"
      p={4}
      shadow="md"
      className="px-10"
    >
      <Heading size="md">Countries App</Heading>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </Flex>
  );
}

export default Navbar;
