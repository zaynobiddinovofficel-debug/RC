import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt="20">
      <Text fontSize="4xl" fontWeight="bold">
        404
      </Text>

      <Text mt="4" fontSize="lg">
        Page Not Found
      </Text>

      <Button mt="6" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
}

export default NotFound;
