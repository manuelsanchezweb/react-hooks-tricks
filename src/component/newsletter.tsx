import { useEffect, useState } from 'react'
import MailchimpSubscribe, { EmailFormFields } from 'react-mailchimp-subscribe'

const formUrl = import.meta.env.VITE_MAILCHIMP_ENDPOINT

const Newsletter = () => {
  return (
    <>
      <MailchimpSubscribe
        url={formUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData: EmailFormFields) => subscribe(formData)}
          />
        )}
      />
    </>
  )
}

const CustomForm = ({ status, message, onValidated }: any) => {
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

    onValidated({
      EMAIL: email,
    })

    setIsSubmitted(true)
    setIsError(false)

    // Display a success message
    console.log('Form submitted successfully!')
  }

  useEffect(() => {
    if (status === 'success') clearFields()
  }, [status])

  const clearFields = () => {
    setEmail('')
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

{
  /* <form action="https://manuelsanchezweb.us21.list-manage.com/subscribe/post" method="POST">
    <input type="hidden" name="u" value="884780a19b6d2a27ff1395e35">
    <input type="hidden" name="id" value="86106f7d0c">
    <input type="hidden" name="orig-lang" value="1">

    <!-- people should not fill these in and expect good things -->
    <div class="field-shift" aria-label="Please leave the following three fields empty" aria-hidden="true">
        <label for="b_name">Name: </label>
        <input type="text" name="b_name" tabindex="-1" value="" placeholder="Freddie" id="b_name">

        <label for="b_email">Email: </label>
        <input type="email" name="b_email" tabindex="-1" value="" placeholder="youremail@gmail.com" id="b_email">

        <label for="b_comment">Comment: </label>
        <textarea name="b_comment" tabindex="-1" placeholder="Please comment" id="b_comment"></textarea>
    </div>

    <div id="mergeTable" class="mergeTable dojoDndSource dojoDndTarget dojoDndContainer">
        
        
        <div class="mergeRow dojoDndItem mergeRow-email" id="mergeRow-0" title="Click to select field then edit settings on right. Drag to reorder fields.">
            <label for="MERGE0">Email Address <span class="req asterisk">*</span></label>
            <div class="field-group">
                <input type="email" autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0" size="25" value="">
                
                
            </div>
            
        </div>
        
        


        

        

        
    </div>

    <div class="submit_container clear">
        <input type="submit" class="formEmailButton" name="submit" value="Subscribe">
    </div>
    
    
</form> */
}
