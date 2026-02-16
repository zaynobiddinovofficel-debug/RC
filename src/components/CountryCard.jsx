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
      onClick={() => navigate(`/country/${country.name.common}`)}
    >
      <Image src={country.flags.png} alt={country.name.common} />
      <Box p={4}>
        <Text fontWeight="bold">{country.name.common}</Text>
        <Text>Population: {country.population}</Text>
        <Text>Region: {country.region}</Text>
        <Text>Capital: {country.capital}</Text>
      </Box>
    </Box>
  );
}

export default CountryCard;
