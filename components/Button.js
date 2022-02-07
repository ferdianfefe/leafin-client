const Button = ({children, className}) => {
    return (
        <button className={`rounded-xl w-full py-[14px] ${className}`}>{children}</button>
    )
}

export default Button