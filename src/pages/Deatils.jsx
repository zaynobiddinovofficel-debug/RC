import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import Loader from "../components/Loader";

function Details() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3/${name}`)
      .then(res => res.json())
      .then(data => setCountry(data[0]));
  }, [name]);

  if (!country) return <Loader />;

  return (
    <Box p={10}>
      <Button mb={5} onClick={() => navigate("/")}>
        Back
      </Button>

      <Flex gap={10} flexDirection={["column","row"]}>
        <Image src={country.flags.png} w="400px" />

        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {country.name.common}
          </Text>

          <Text>Population: {country.population}</Text>
          <Text>Region: {country.region}</Text>
          <Text>Subregion: {country.subregion}</Text>
          <Text>Capital: {country.capital}</Text>

          <Box mt={5}>
            <Text fontWeight="bold">Border Countries:</Text>

            <Flex gap={3} mt={2} wrap="wrap">
              {country.borders
                ? country.borders.map(code => (
                    <Button
                      key={code}
                      size="sm"
                      onClick={() =>
                        navigate(`/country/${code}`)
                      }
                    >
                      {code}
                    </Button>
                  ))
                : "No Borders"}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Details;
