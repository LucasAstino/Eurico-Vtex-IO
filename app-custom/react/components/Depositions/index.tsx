import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useCssHandles } from "vtex.css-handles";

const HANDLES_DEPOSITIONS = [
  "depoimentos__list",
  "depoimento__item",
  "depoimento",
  "depoimento__titulo",
  "depoimento__nome",
  "depoimento__mensagem",
  "depoimento__data",
  "depoimento__load",
] as const;

interface Deposition {
  nome: string;
  mensagem: string;
  titulo: string;
  horario: string;
}

export const Depositions: React.FC = () => {
  const { handles } = useCssHandles(HANDLES_DEPOSITIONS);
  const [depositions, setDepositions] = useState<Deposition[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/dataentities/DP/search?_fields=nome,mensagem,titulo,horario",
          {
            headers: {
              Accept: "application/vnd.vtex.ds.v10+json",
              "Content-Type": "application/json",
              "REST-Range": "resources=0-100",
            },
            method: "GET",
          }
        );
        const data: Deposition[] = await response.json();
        setDepositions(data);
      } catch (error) {
        console.error("Error fetching depositions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul className={handles.depoimentos__list}>
      {depositions.length > 0 ? (
        depositions.map((item, index) => (
          <li key={index} className={handles.depoimento__item}>
            <div className={handles.depoimento}>
              <div className={handles.depoimento__titulo}>{item.titulo}</div>
              <div className={handles.depoimento__nome}>{item.nome}</div>
            </div>
            <div
              className={handles.depoimento__mensagem}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.mensagem),
              }}
            />
            <div className={handles.depoimento}>
              <div className={handles.depoimento__data}>{item.horario}</div>
            </div>
          </li>
        ))
      ) : (
        <div className={handles.depoimento__load}>Loading...</div>
      )}
    </ul>
  );
};

const HANDLES__NEWTESTIMONIAL = [
  "popup-depoimento__container",
  // "popup-depoimento__close",
  "popup-depoimento__title",
  "popup__form",
  "e-popup__form-input",
  "e-popup__form-input",
  "e-popup__form-input",
  "popupFormSubmit",
  "popup__success",
  "popupSuccessActive",
  "e-popup__form-submit",
] as const;

export const NewTestimonial: React.FC = () => {
  const { handles } = useCssHandles(HANDLES__NEWTESTIMONIAL);
  // const [isPopupActive, setIsPopupActive] = useState(false);
  const [isSuccessActive, setIsSuccessActive] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const jsonData = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      titulo: formData.get("titulo"),
      mensagem: formData.get("mensagem"),
      horario: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/dataentities/DP/documents/", {
        method: "POST",
        headers: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log(response);
        setIsSuccessActive(true);
        setTimeout(() => setIsSuccessActive(false), 800);
      } else {
        console.error("Failed to submit deposition");
      }
    } catch (error) {
      console.error("Error submitting deposition:", error);
    }
  };

  return (
    <>
      <div
        className={`${handles["popup-depoimento__container"]} `}
      >
        <p className={handles["popup-depoimento__title"]}>
          Escreva um novo depoimento
        </p>
        <form
          id="popup__form"
          className={handles.popup__form}
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            name="nome"
            id="e-popup__form-nome"
            placeholder="Nome"
            required
            className={handles["e-popup__form-input"]}
          />
          <input
            type="email"
            name="email"
            id="e-popup__form-email"
            placeholder="Email"
            required
            className={handles["e-popup__form-input"]}
          />
          <input
            type="text"
            name="titulo"
            id="e-popup__form-titulo"
            placeholder="Título"
            required
            className={handles["e-popup__form-input"]}
          />
          <textarea
            name="mensagem"
            id="text"
            placeholder="Mensagem"
            required
            className={handles["e-popup__form-input"]}
          ></textarea>
          <button
            type="submit"
            className={handles["e-popup__form-submit"]}
          >
            Publicar
          </button>
        </form>
        {isSuccessActive && (
          <div
            className={`${handles.popup__success} ${handles.popupSuccessActive}`}
          >
            Seu depoimento foi recebido
          </div>
        )}
      </div>
    </>
  );
};
