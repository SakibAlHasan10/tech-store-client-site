import {
  // Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FeaturedCard from "../home/FeaturedCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../hooks/axiosPublic/useAxiosPublic";
// import useCountDocument from "../../hooks/countDocument/useCountDocument";

const Products = () => {
  // const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  // const [count]=useCountDocument()
  // console.log(count)
  const axiosPublic = useAxiosPublic();
  // const {  data: featuredProduct = [] } = useQuery({
  //   queryKey: ["pagination",],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get(`/v1/products`);

  //     return res?.data;
  //   },
  // });

  // const arr = [...new Array(30)];
  // console.log(arr);
  // const perPage = 20;
  // const numberOfPage = Math.ceil(arr/ perPage);
  // console.log(numberOfPage);
  // const pages = [...Array(numberOfPage).keys()];
  const handleSearchValue = (e) => {
    e.preventDefault();
    setSearchValue(e.target.searchBar.value);
    console.log(e.target.searchBar.value);
  };
  const { data: searchProduct = [] } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: async () => {
      const res = await axiosPublic.get(`/v1/products?text=${searchValue}`);

      return res?.data;
    },
  });
  // console.log(currentPage)
  const active = searchProduct?.filter((prod) => prod?.status === "Accepted");

  return (
    <div>
      <Grid>
        <Grid
          sx={{
            color: "white",
            background: "linear-gradient(to right bottom, #1962A6, #6EB846)",
          }}
          height={100}
        ></Grid>
        <Container>
          <Grid mt={3}>
            <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
              All Product:
            </Typography>
            <Grid>
              <Typography sx={{ my: "10px" }}>
                Search product by tag name
              </Typography>
              <Paper
                component="form"
                onSubmit={handleSearchValue}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <InputBase
                  name="searchBar"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Product"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Grid
                container
                rowSpacing={2}
                mt={3}
                columnSpacing={{ xs: 1, sm: 2 }}
              >
                {/* {searchProduct &&
                  searchProduct?.map((prod) => (
                    <FeaturedCard key={prod._id} prod={prod}></FeaturedCard>
                  ))} */}
                {active &&
                  active?.map((prod) => (
                    <FeaturedCard key={prod._id} prod={prod}></FeaturedCard>
                  ))}
              </Grid>
              {/* {
                pages?.map(page=><Button 
                  key={page}
                  sx={{mr:"5px"}}
                  variant="outlined" 
                  shape="rounded"
                  // onClick={()=>setCurrentPage(page)}
                >{page+1}</Button>)
              }  */}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </div>
  );
};

export default Products;
