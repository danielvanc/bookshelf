import styled from '@emotion/styled/macro'
import {Dialog as ReachDialog} from '@reach/dialog'
import * as colors from '../styles/colors';
import * as mq from '../styles/media-queries'

const ButtonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base
  },
  secondary: {
    background: colors.gray,
    color: colors.text
  }
}

const Button = styled.button({
  padding: '10px 15px',
  border: '0',
  lineHeight: '1',
  borderRadius: '3px'
},
  ({ variant = 'primary'}) => ButtonVariants[variant]
)

// const Button = styled.button`
//   padding: 10px 15px;
//   border: 0;
//   line-height: 1;
//   border-radius: 3px;

//   background: ${({variant}) =>
//     variant === 'primary' ? '#3f51b5' : "#f1f2f7"};

//   color: ${({variant}) => (variant === 'primary' ? 'white' : '#434449')};
// `


const Input = styled.input`
  border-radius: 3px;
  border: 1px solid ${colors.gray10};
  background: ${colors.gray};
  padding: 8px 12px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

export {CircleButton, Dialog, Button, FormGroup, Input}
