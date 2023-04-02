import { style, globalStyle, createTheme } from '@vanilla-extract/css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('body', {
  backgroundColor: '#2a2d38',
});

export const [, vars] = createTheme({
  color: {
    main: '#16afc0',
  },
});

export const mainStyle = style({
  width: 600,
  height: 600,
  border: '1px solid red',
  borderRadius: 15,
});

export const headerStyle = style({
  minWidth: 1520,
  height: 70,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Roboto',
  color: 'white',
  marginBottom: 40,
});

export const containerStyle = style({
  width: '100%',
  minWidth: 1520,
  margin: '0 auto',
  height: 700,
  display: 'flex',
  justifyContent: 'center',
});

export const textAreaStyle = style({
  transform: 'translate(-20%)',
  width: 200,
  height: '40%',
  padding: 10,
  fontFamily: 'Roboto',
  color: 'white',
  backgroundColor: '#1d1c20',
  border: `1px solid ${vars.color.main}`,
});

export const configStyle = style({
  transform: 'translate(-20%)',
  marginTop: '20px',
  width: 200,
  height: 296,
  padding: 10,
  border: `1px solid ${vars.color.main}`,
  fontFamily: 'Roboto',
  color: '#ccc',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: 15,
});

export const arrowButtonStyle = style({
  position: 'relative',
  display: 'inline-block',
  width: 60,
  height: 22,
});
