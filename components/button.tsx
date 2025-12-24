import React from "react";

const variantStyles :  Record<string, string> = {
    default: 'bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-700 dark:hover:bg-gray-200',
    outline: 'border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500',
    ghost: 'rounded-md bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-500'
  }

const sizeStyles: Record<string, string> = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
}

export default function Button({props} : any) {

    return (
        <button className={`
            ${props.variant ? variantStyles[props.variant] : variantStyles['default']} 
            ${props.size ? sizeStyles[props.size] : sizeStyles['medium']}`}>
            {props.text}
        </button>
    )
}