import React from 'react';
import './button.scss';

interface IButton {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({ children, className, onClick }: IButton) => {
    return <button type="button" className={["button-component", className].join(' ')} onClick={onClick}>{children}</button>
}

export default Button;