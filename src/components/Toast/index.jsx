/* eslint-disable no-undef */
import React from 'react'

const Toast = (props) => {
  // Bootstrap toast
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById(props.id)
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  })
}
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
  <div id={props.id} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
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