import { useEffect, useState } from "react";
import { Input, Select, SimpleGrid, Box } from "@chakra-ui/react";
import CountryCard from "../components/CountryCard";
import Loader from "../components/Loader";

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setCountries([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  const filtered = countries.filter(country => {
    return (
      country.name.common
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (region === "" || country.region === region)
    );
  });

  return (
    <Box p={10}>
      <div className="flex gap-5 mb-10">
        <Input
          placeholder="Search country..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <Select
          placeholder="Filter by Region"
          onChange={e => setRegion(e.target.value)}
        >
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </Select>
      </div>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        {filtered.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Home;
