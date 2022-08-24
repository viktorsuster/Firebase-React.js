import React from 'react'
import * as bootstrap from "bootstrap"

const Toast = (props) => {
  // Bootstrap toast
  const toastLiveExample = document.getElementById('liveToast')
  if (props.ready) {
      const toast = new bootstrap.Toast(toastLiveExample)
  
      toast.show()
  }
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <strong className="me-auto">{props.main}</strong>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
      {props.second}
    </div>
  </div>
</div>
  )
}

export default Toast