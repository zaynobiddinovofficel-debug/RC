import { Flex, Spinner } from "@chakra-ui/react";

function Loader() {
  return (
    <Flex justify="center" align="center" h="60vh">
      <Spinner size="xl" />
    </Flex>
  );
}

export default Loader;
