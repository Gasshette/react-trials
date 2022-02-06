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

        imgRefs.current[index].classList = `inline-block animate__animated animate__fadeOutLeft`;
        imgRefs.current[nextIndex].classList = `inline-block animate__animated animate__fadeInRight`;

        setTimeout(() => {
            setIndex(nextIndex);
        }, 1000);
    }

    const dec = () => {
        const nextIndex = index <= 0 ? images.length - 1 : index - 1;

        imgRefs.current[index].classList = `inline-block animate__animated animate__fadeOutRight`;
        imgRefs.current[nextIndex].classList = `inline-block animate__animated animate__fadeInLeft`;

        setTimeout(() => {
            setIndex(nextIndex);
        }, 1000);
    }

    return (
        <>
            <div className="slider-component bg-stone-700 flex items-center justify-center">
                {images.map((img, i) => <img key={Math.random()} ref={el => imgRefs.current[i] = el} src={img} className={index === i ? 'inline-block' : 'hidden'} />)}
            </div>
            <button className="bg-blue-500 p-3 py-2 rounded my-3 hover:bg-blue-600" onClick={() => dec()}> Left </button>
            <button className="bg-blue-500 p-3 py-2 rounded m-3 hover:bg-blue-600" onClick={() => inc()}> Right </button>
        </>
    )
}

export default Slider;