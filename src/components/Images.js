import styled from 'styled-components'
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Images() {
    const {activePark} = useContext(ActiveParkContext)
    
    const slideImages = activePark.images.map((image)=>{
        return( 
            < SlideImage key={image.title}img src={image.url} alt={image.alt}/>
    )})
    

    return (
        // <Container className="alice-carousel">
            <AliceCarousel autoPlay autoPlayInterval="3000" items={slideImages}>
                
            </AliceCarousel>    
        // </Container>
    )
}

export default Images


// const Container = styled.div`
//     height: 400px;
//     width: 100%;
//     object-fit: cover;
// `

const SlideImage = styled.img`
    width: 100%;
    height: 500px;
    object-fit: cover;
`
    
