
type ButtonProps = {
    children: React.ReactNode;
    ariaLabel?: string;
    onClick: () => void;
    extraClasses?: string;
}

const Button = ({children, ariaLabel, onClick, extraClasses}: ButtonProps) => {
    return (
        <button className={
            `bg-var(--color-bg) text-var(--color-text) border border-primary text-md py-2 px-4 rounded ${extraClasses}`
        } aria-label={ariaLabel} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;