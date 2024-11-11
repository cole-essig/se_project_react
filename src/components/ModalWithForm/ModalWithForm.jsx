import './ModalWithForm.css'

function ModalWithForm({ children, handleModalClose, isOpen, handleSubmit, title, button }) {
  return (
  <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
    <div className='modal__content'>
      <h2 className="modal__title">{title}</h2>
      <button type='button' className='modal__close' onClick={handleModalClose}></button>
      <form className='modal__form' onSubmit={handleSubmit}>
          {children}
          <button className="modal__submit-button" type='submit'>{button}</button>
          {/* needs second button here for the login modal or register */}
      </form>
    </div>
  </div>
);
}

export default ModalWithForm;
