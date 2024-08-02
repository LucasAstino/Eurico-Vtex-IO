import React, {  useState,useRef } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { newsletterFactory } from '../NewsletterFactory'

export const HANDLES_POPUPNEWSLETTER = [
  'newsletterform',
  'newsletterform__image',
  'newsletterform__close',
  'newsletterform__form',
  'newsletterform__formTitle',
  'newsletterform__formSubtitle',
  'newsletterform__formInputEmail',
  'newsletterform__formInputName',
  'newsletterform__formSubmit',
  'newsletterform__success',
] as const

export function NewsletterForm() {
  const { handles } = useCssHandles(HANDLES_POPUPNEWSLETTER)
  const [data, setData] = useState({
    success: false,
  })
  const submitButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const newsletterData = {
      nome: form.get('name') as string,
      email: form.get('email') as string,
      sexo: submitButtonRef.current?.getAttribute('data-gender') as string,
    }


    const newsletter = newsletterFactory()
    newsletter.send(newsletterData).then(function () {
    setData(() => ({ ...data, success: true }))
    })

  }

  return (
    <div
      className={applyModifiers(
        handles.newsletterform,
        data.success ? 'success' : ''
      )}
    >
      <span className={handles.newsletterform__formTitle}>
      FIQUE POR DENTRO DAS <strong className='strong'>NOVIDADES</strong>
      </span>
      <form className={handles.newsletterform__form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="DIGITE SEU NOME"
          aria-label="DIGITE SEU NOME"
          required
          className={handles.newsletterform__formInputName}
        />
        <input
          type="email"
          name="email"
          placeholder="DIGITE SEU E-MAIL"
          aria-label="DIGITE SEU E-MAIL"
          required
          className={handles.newsletterform__formInputEmail}
        />
        <button
          className={handles.newsletterform__formSubmit}
          data-gender="feminino"
          type="submit"
          onClick={() => (submitButtonRef.current = document.activeElement as HTMLButtonElement)}
        >
          Feminino
        </button>
        <button
          className={handles.newsletterform__formSubmit}
          data-gender="masculino"
          type="submit"
          onClick={() => (submitButtonRef.current = document.activeElement as HTMLButtonElement)}
        >
          Masculino
        </button>
      </form>
      <div className={handles.newsletterform__success}>Cadastrado com sucesso</div>
    </div>
  )
}
