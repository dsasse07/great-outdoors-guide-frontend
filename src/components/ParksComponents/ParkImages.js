import styled from 'styled-components'
import {useContext} from 'react'
import ActiveParkContext from "../ActiveParkContext";
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


function ParkImages() {
    const {activePark} = useContext(ActiveParkContext)
    

    const slideImages = activePark?.images.map((image)=>{
        return( 
            < SlideImage key={image.title}img src={image.url} alt={image.alt}/>
    )}) 

    return (
        <Container >
            <Carousel showThumbs={false} infiniteLoop={true}>
                {slideImages}
            </Carousel>
        </Container>
    )
}

export default ParkImages


const Container = styled.div`
    height: 100%;
    width: 100%;
    /* overflow: hidden; */
    display: flex;
    flex-direction: column;
`

const SlideImage = styled.img`
    background-color: none;
    /* width: auto;
    height: auto; */
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    background-repeat: no-repeat;
    margin: auto;
`


