import * as React from 'react'
import {Dialog} from './lib'

const ModalContext = React.createContext()

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)

  const dismiss = () => setIsOpen(false)

  return React.cloneElement(child, {
    onClick: dismiss,
  })
}

function ModalOpenButton({children}) {
  const [, setIsOpen] = React.useContext(ModalContext)

  const open = () => setIsOpen(true)

  return React.cloneElement(children, {
    onClick: open,
  })
}

function ModalContents(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
