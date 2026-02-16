import { useEffect, useState } from "react";
import {
  Input,
  Select,
  SimpleGrid,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import CountryCard from "../components/CountryCard";
import Loader from "../components/Loader";

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <Flex justify="center" mt="20">
        <Text fontSize="xl">Something went wrong!</Text>
      </Flex>
    );

  const filtered = countries.filter((country) => {
    return (
      country.name.common
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (region === "" || country.region === region)
    );
  });

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: "gray.900" }} px={[5,10]} py={10}>
      <Flex
        justify="space-between"
        align="center"
        mb={10}
        direction={["column", "row"]}
        gap={5}
      >
        <Input
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxW="400px"
          bg="white"
          _dark={{ bg: "gray.700" }}
        />

        <Select
          placeholder="Filter by Region"
          onChange={(e) => setRegion(e.target.value)}
          maxW="200px"
          bg="white"
          _dark={{
            bg: "gray.700",
            color: "gray",
            placeholderColor: "gray.200" // placeholder rangini dark mode uchun
          }}
        >
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </Select>

      </Flex>

      {filtered.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
          {filtered.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </SimpleGrid>
      ) : (
        <Flex justify="center" mt="20">
          <Text fontSize="lg">No countries found</Text>
        </Flex>
      )}
    </Box>
  );
}

export default Home;
