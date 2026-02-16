import { Flex, Spinner, Text } from "@chakra-ui/react";

function Loader() {
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      h="70vh"
      gap="4"
      className="bg-gray-50 dark:bg-gray-900"
    >
      <Spinner size="xl" thickness="4px" speed="0.6s" />
      <Text fontSize="lg" fontWeight="medium">
        Loading countries...
      </Text>
    </Flex>
  );
}

export default Loader;
