import React from 'react';
import './button.scss';

const Button = ({ text }: { text: string }) => {
    return <button type="button" className="button-component">{text}</button>
}

export default Button;