interface HeadingProps {
  title: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  extraClasses?: string
}

const Heading = ({ title, variant = "h1", extraClasses }: HeadingProps) => {
  return (
    <>
      {variant === 'h1' && (
        <h1
          className={`text-3xl md:text-5xl mb-4 font-bold ${extraClasses}`}
        >
          {title}
        </h1>
      )}
      {variant === 'h2' && (
        <h2
          className={`text-2xl md:text-4xl mb-4 font-bold ${extraClasses}`}
        >
          {title}
        </h2>
      )}
      {variant === 'h3' && (
        <h3
          className={`text-[1vw] leading-none  font-semibold mb-4 ${extraClasses}`}
        >
          {title}
        </h3>
      )}
      {variant === 'h4' && (
        <h4 className={`text-2xl mb-4 ${extraClasses}`}>{title}</h4>
      )}
      {variant === 'h5' && (
        <h5 className={`text-xl mb-4 ${extraClasses}`}>{title}</h5>
      )}
      {variant === 'h6' && (
        <h6 className={`text-xl mb-4 ${extraClasses}`}>{title}</h6>
      )}
    </>
  )
}

export default Heading
