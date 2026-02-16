import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CountryCard({ country }) {
  const navigate = useNavigate();

  return (
    <Box
      shadow="md"
      borderRadius="md"
      overflow="hidden"
      cursor="pointer"
      bg="white"
      _dark={{ bg: "gray.700" }}
      onClick={() => navigate(`/country/${country.name.common}`)}
      transition="all 0.2s"
      _hover={{ transform: "scale(1.03)", shadow: "lg" }}
    >
      <Image
        src={country.flags.png}
        alt={country.name.common}
        w="100%"
        h="200px"
        objectFit="cover"
      />
      <Box p={4}>
        <Text fontWeight="bold" fontSize="lg" mb={2} _dark={{ color: "white" }}>
          {country.name.common}
        </Text>
        <Text _dark={{ color: "gray.200" }}>
          <b>Population:</b> {country.population.toLocaleString()}
        </Text>
        <Text _dark={{ color: "gray.200" }}>
          <b>Region:</b> {country.region}
        </Text>
        <Text _dark={{ color: "gray.200" }}>
          <b>Capital:</b> {country.capital?.[0]}
        </Text>
      </Box>
    </Box>
  );
}

export default CountryCard;
