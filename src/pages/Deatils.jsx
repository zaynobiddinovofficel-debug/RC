import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import Loader from "../components/Loader";

function Details() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        const countryData = data[0];
        setCountry(countryData);

        if (countryData.borders) {
          fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(",")}`
          )
            .then((res) => res.json())
            .then((borderData) => {
              setBorders(borderData);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setBorders([]);
          setLoading(false);
        }
      })
      .catch(() => {
        setCountry(null);
        setBorders([]);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <Loader />;

  if (!country)
    return (
      <Flex justify="center" mt="20">
        <Text fontSize="xl" _dark={{ color: "gray.300" }}>
          Country not found
        </Text>
      </Flex>
    );

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }} px={[5, 10]} py={10}>
      <Button mb={8} onClick={() => navigate("/")}>
        ← Back
      </Button>

      <Flex gap={16} direction={["column", "row"]}>
        <Image
          src={country.flags.png}
          w={["100%", "500px"]}
          h="300px"
          objectFit="cover"
          borderRadius="md"
        />
        <Box flex="1">
          <Text fontSize="3xl" fontWeight="bold" mb={6} _dark={{ color: "white" }}>
            {country.name.common}
          </Text>

          <Flex justify="space-between" direction={["column", "row"]} gap={10}>
            <Box>
              <Text>
                <b>Native Name:</b>{" "}
                {Object.values(country.name.nativeName || {})[0]?.common}
              </Text>
              <Text>
                <b>Population:</b> {country.population.toLocaleString()}
              </Text>
              <Text>
                <b>Region:</b> {country.region}
              </Text>
              <Text>
                <b>Sub Region:</b> {country.subregion}
              </Text>
              <Text>
                <b>Capital:</b> {country.capital?.[0]}
              </Text>
            </Box>

            <Box>
              <Text>
                <b>Top Level Domain:</b> {country.tld?.[0]}
              </Text>
              <Text>
                <b>Currencies:</b>{" "}
                {country.currencies &&
                  Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ")}
              </Text>
              <Text>
                <b>Languages:</b>{" "}
                {country.languages &&
                  Object.values(country.languages).join(", ")}
              </Text>
            </Box>
          </Flex>
          <Flex mt={10} align="center" wrap="wrap" gap={3}>
            <Text fontWeight="bold" mr={2} _dark={{ color: "white" }}>
              Border Countries:
            </Text>

            {borders.length > 0 ? (
              borders.map((border) => (
                <Button
                  key={border.cca3}
                  size="sm"
                  onClick={() => navigate(`/country/${border.name.common}`)}
                >
                  {border.name.common}
                </Button>
              ))
            ) : (
              <Text _dark={{ color: "gray.300" }}>No Borders</Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Details;
