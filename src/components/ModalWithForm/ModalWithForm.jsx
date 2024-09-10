import './ModalWithForm.css'

function ModalWithForm({ children, buttonText, title, activeModal, handleModalClose, isOpen }) {
  return (
  <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
    <div className='modal__content'>
      <h2 className="modal__title">{title}</h2>
      <button type='button' className='modal__close' onClick={handleModalClose}></button>
      <form className='modal__form'>
          {children}
          <button className="modal__submit-button" type='submit'>{buttonText}</button>
      </form>
    </div>
  </div>
);
}

export default ModalWithForm;
