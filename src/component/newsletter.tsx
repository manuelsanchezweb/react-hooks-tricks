import { useState } from 'react'

const formUrl = import.meta.env.VITE_MAILCHIMP_ENDPOINT

const Newsletter = ({ message }: { message?: string }) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    // Use the Mailchimp API to submit the form data
    const selectedEmail = email
    setEmail('')

    // validate email
    if (!selectedEmail || !selectedEmail.includes('@')) {
      setIsError(true)
      return
    }

    setIsSubmitted(true)
    setIsError(false)

    console.log(formUrl)

    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email_address: selectedEmail,
        status: 'subscribed',
      }),
    })

    // Handle any errors that occur
    if (!response.ok) {
      console.error('Failed to submit form:', response)
      return
    }

    // Display a success message
    console.log('Form submitted successfully!')
  }

  return (
    <form
      className="flex flex-col items-center gap-4 text-center"
      onSubmit={handleSubmit}
      target="_blank"
    >
      {message && <p>{message}</p>}

      <div className="flex flex-col items-center gap-4">
        {isError == true && (
          <p className="text-red-500 text-xs">
            ¡Por favor, introduce un email válido!
          </p>
        )}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <label>
            <input
              className="custom-link"
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              placeholder="Correo"
              type="email"
              name="EMAIL"
              value={email}
            />
          </label>

          {isSubmitted ? (
            <p className="text-green-500 text-xs !mb-0">
              ¡Gracias por suscribirte!
            </p>
          ) : (
            <button className="custom-link max-w-fit mx-auto" type="submit">
              Mantenme al tanto de las noticias
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default Newsletter
