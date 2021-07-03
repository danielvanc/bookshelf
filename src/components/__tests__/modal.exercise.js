import React from 'react'
import {Modal, ModalContents, ModalOpenButton} from '../modal'
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('can be opened and closed', () => {
  const label = 'Login form'
  const title = 'Login'
  const content = 'Modal contents'
  render(
    <Modal>
      <ModalOpenButton>
        <button>Login</button>
      </ModalOpenButton>
      <ModalContents aria-label={label} title={title}>
        {content}
      </ModalContents>
    </Modal>,
  )

  const openButton = screen.getByRole('button', {name: /login/i})
  userEvent.click(openButton)

  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', label)
  // scope queries to just the dialog
  const inModal = within(modal)
  expect(inModal.getByRole('heading', {name: title})).toBeInTheDocument()
  expect(inModal.getByText(content)).toBeInTheDocument()

  // expect(queryByText(/modal contents/i))

  // const closeButton = screen.getByRole('button', {name: /close/i})
  const closeButton = inModal.getByRole('button', {name: /close/i})

  userEvent.click(closeButton)

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
