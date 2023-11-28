import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Grid, Typography } from "@mui/material";
const AllReviews = ({ productReviews }) => {
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {productReviews?.map((review) => (
          <Grid key={review._id}>
            <SwiperSlide>
              <Grid
                container
                bgcolor={"#ebe4f0"}
                p={2}
                sx={{ borderRadius: "10px" }}
                justifyContent={"center"}
                textAlign={"center"}
                alignItems={"center"}
              >
                <Grid
                  item
                  mb={1}
                  bgcolor={"#fb8500"}
                  sx={{
                    borderRadius: "50%",
                    width: "90px",
                    height: "90px",
                    pt: "5px",
                    pl: "5px",
                  }}
                >
                  <Box
                    sx={{ width: "80px", height: "80px", borderRadius: "50%" }}
                    component={"img"}
                    src={review?.photo}
                  />
                </Grid>
                <Grid item px={4} textAlign={"center"}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fb8500", mb: "10px" }}
                  >
                    {review.name}
                  </Typography>
                  <Typography>{review.rating}</Typography>
                  <Typography sx={{ mt: "10px" }}>
                    {review.description}
                  </Typography>
                </Grid>
              </Grid>
            </SwiperSlide>
          </Grid>
        ))}
      </Swiper>
    </div>
  );
};
AllReviews.propTypes = {
  productReviews: PropTypes.object,
};
export default AllReviews;
