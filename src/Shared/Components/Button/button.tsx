import React from 'react';
import './button.scss';

interface IButton {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({ children, className, disabled, onClick }: IButton) => {
    return <button type="button" className={["button-component", className].join(' ')} onClick={onClick} disabled={disabled}>{children}</button>
}

export default Button;