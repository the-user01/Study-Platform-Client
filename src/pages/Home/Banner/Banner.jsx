import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';

import img0 from "../../../assets/img0.avif";
import img1 from "../../../assets/img1.avif";
import img2 from "../../../assets/img2.avif";
import img3 from "../../../assets/img3.avif";
import img4 from "../../../assets/img4.avif";
import img5 from "../../../assets/img5.webp";
import img6 from "../../../assets/img6.avif";

const Banner = () => {
    return (
        <div className='text-center mt-6'>
            <Swiper
                slidesPerView={3}
                spaceBetween={2}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src={img0} className='h-80 w-96'/></SwiperSlide>
                <SwiperSlide><img src={img1} className='h-80 w-96'/></SwiperSlide>
                <SwiperSlide><img src={img2} className='h-80 w-96'/></SwiperSlide>
                <SwiperSlide><img src={img3} className='h-80 w-96'/></SwiperSlide>
                <SwiperSlide><img src={img4} className='h-80 w-96'/></SwiperSlide>
                <SwiperSlide><img src={img5} className='h-80 w-96'/></SwiperSlide>
                <SwiperSlide><img src={img6} className='h-80 w-96'/></SwiperSlide>
            </Swiper>
        </div>

    );
};

export default Banner;