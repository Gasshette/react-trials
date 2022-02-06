import React from "react";
import { CSSTransition } from "react-transition-group";
import IChildren from "../Interfaces/IChildren";

// function WithAnimation(Component: any, index: number) {
//     // const [showComponent, setShowComponent] = React.useState(false);
//     return (

//     )


// }

const WithAnimation = ({ children }: any) => {
    const ref = React.createRef<HTMLSpanElement>();
    // return <>{children}</>;
    const animIn = "animate__animated animate__fadeInLeftBig";
    const animOut = "animate__animated animate__fadeOutRightBig";

    React.useEffect(() => {
        // mount
        const el: HTMLSpanElement | null = ref.current;

        if (el) {
            el.className = '';
            el.className = animIn;
            console.log('[MOUNT] classlist = ', el.classList.value);
        }

        // unmount
        return () => {
            if (el) {
                el.className = animOut;
                console.log('[UNMOUNT] classlist = ', el.classList.value);
            }
        }
    });
    return <span ref={ref}>{children}</span>;
}

export default WithAnimation;