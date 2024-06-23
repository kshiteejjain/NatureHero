// Modal.js

import './Modal.css';

const Modal = ({ show, handleClose, children }: any) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                {children}
            </div>
            <div className='overlay' onClick={handleClose}></div>
        </div>
    );
};

export default Modal;
