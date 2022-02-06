import React from 'react';
import forestMe from '../../Assets/Images/forestMe.jpeg';
import youngMe from '../../Assets/Images/youngMe.jpg';
import meAndBro from '../../Assets/Images/meAndBro.jpg';

import './slider.scss';

const Slider = () => {
    const [index, setIndex] = React.useState(0);
    const images = [forestMe, youngMe, meAndBro];
    const imgRefs = React.useRef<any>([]);

    const inc = () => {
        const nextIndex = index >= images.length - 1 ? 0 : index + 1;

        imgRefs.current[index].classList = `d-inline-block animate__animated animate__fadeOutLeft`;
        imgRefs.current[nextIndex].classList = `d-inline-block animate__animated animate__fadeInRight`;

        setTimeout(() => {
            setIndex(nextIndex);
        }, 1000);
    }

    const dec = () => {
        const nextIndex = index <= 0 ? images.length - 1 : index - 1;

        imgRefs.current[index].classList = `d-inline-block animate__animated animate__fadeOutRight`;
        imgRefs.current[nextIndex].classList = `d-inline-block animate__animated animate__fadeInLeft`;

        setTimeout(() => {
            setIndex(nextIndex);
        }, 1000);
    }

    return (
        <>
            <h3>Slider</h3>
            <p>The animation cannot be managed so it is invisible outside of the slider component. An idea would be to change the opacity with a keyframe in one second</p>
            <div className="slider-component bg-secondary overflow-hidden d-flex align-items-center justify-content-center">
                {images.map((img, i) => <img key={Math.random()} ref={el => imgRefs.current[i] = el} src={img} className={index === i ? 'd-inline-block' : ''} />)}
            </div>
            <button className="btn btn-primary my-3" onClick={() => dec()}> Left </button>
            <button className="btn btn-primary m-3" onClick={() => inc()}> Right </button>
        </>
    )
}

export default Slider;