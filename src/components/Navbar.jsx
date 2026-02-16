import {
  Flex,
  Heading,
  Button,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      justify="space-between"
      align="center"
      px={10}
      py={5}
      shadow="sm"
      bg={colorMode === "light" ? "white" : "gray.800"}
      color={colorMode === "light" ? "gray.800" : "white"}
    >
      <Heading size="md" fontWeight="bold">
        Where in the world?
      </Heading>

      <Button
        onClick={toggleColorMode}
        variant="ghost"
        leftIcon={
          colorMode === "light" ? <MoonIcon /> : <SunIcon />
        }
      >
        {colorMode === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </Flex>
  );
}

export default Navbar;
