import { Container, Grid, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useAuth from "../../../../hooks/authHook/useAuth";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// react tag input
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import useAxiosPublic from "../../../../hooks/axiosPublic/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useGetUser from "../../../../hooks/getUser/useGetUser";
import useGetUserAllProduct from "../../../../hooks/useGetUserAllProduct";

const KeyCodes = {
  comma: 188,
  SPACE: 32,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.SPACE, KeyCodes.enter];

const image_hosting_key = import.meta.env.VITE_IMG_HOST;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddProduct = () => {
  const [currentUser]= useGetUser()
  const [myProducts] = useGetUserAllProduct()
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [err, setErr]= useState("")
  const [imageFile, setImageFile] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate()
  const [tags, setTags] = useState([]);
  const handleFile = (e) => {
    setImageFile(e.target.files[0]);
  };
  // console.log(imageFile)
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  //   product form
  // console.log(myProducts);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr("")
    if(myProducts.length===1&& currentUser.status!=="verified"){
      setErr("Please buy PREMIUM MEMBERSHIP then post product")
      return 
    }
    const data = new FormData(event.currentTarget);
    const productName = data.get("productName");
    const productDescription = data.get("productDescription");
    const links = data.get("external_Links");
    const name = user?.displayName;
    const email = user?.email;
    const photo = user.photoURL;

    const res = await axiosPublic.post(
      image_hosting_api,
      { image: imageFile },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      const product = {
        productName,
        productDescription,
        links,
        featured:false,
        status:"Pending",
        vote:0,
        productImage: res.data.data.display_url || "Not available",
        tags,
        owner: { name, email, photo },
      };
      const pro = await axiosSecure.post("/products", product);
      if(pro.statusText==="OK"){
        toast.success("Product saved successfully")
        navigate('/dashboard/my-products')
      }
    }
  };
  return (
    <Box>
      <Typography textAlign={"center"} sx={{ fontWeight: "800" }}>
        Add Product
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 8 }}>
        <Container sx={{ display: "flex", gap: "20px" }}>
          {/* product section */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="productName"
                label="Product Name"
                name="productName"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Product Description"
                name="productDescription"
                multiline
                required
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid  item xs={12} sx={{ color: "#000" }}>
              <ReactTags
                tags={tags}
                // suggestions={suggestions}
                inline={false}
                border={2} 
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="contained"
                fullWidth
                name="productPhoto"
                onChange={handleFile}
                startIcon={<CloudUploadIcon />}
              >
                Upload Product Image
                <VisuallyHiddenInput type="file" />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                disabled
                fullWidth
                id="outlined-disabled"
                label="Owner Name"
                name="name"
                defaultValue={user?.displayName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="outlined-disabled"
                label="Owner Email"
                fullWidth
                name="email"
                defaultValue={user?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="owner_Photo"
                label="Owner Photo"
                name="photo"
                fullWidth
                defaultValue={user?.photoURL}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="external_Links"
                label="Add External Links"
                name="external_Links"
                fullWidth
              />
            </Grid>
          </Grid>
        </Container>
        <Typography sx={{textAlign:"center", mt:"20px", color:"red"}}>
          {err}
        </Typography>
        <Container>
          <Button
            type="submit"
            size="medium"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AddProduct;
