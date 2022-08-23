import React from 'react'

const Toast = (props) => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
  <div id={props.id} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <strong className="me-auto">Výborne!</strong>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
    Podnet bol pridaný.
    </div>
  </div>
</div>
  )
}

export default Toast