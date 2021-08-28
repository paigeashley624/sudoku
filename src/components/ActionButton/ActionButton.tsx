import React from 'react';
import './ActionButton.scss';

const ActionButton = (buttonProps: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return <button className='action-button' {...buttonProps}/>
}

export default ActionButton;