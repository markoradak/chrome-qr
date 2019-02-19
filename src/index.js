import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QR from 'qrcode.react';
import styled, { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset-advanced';

const GlobalStyle = createGlobalStyle`${reset}`;

const Wrapper = styled.div`
  padding: 40px 40px 25px;
`;

const QRCode = styled(QR)`
  ${props => props.updated && css`transition: opacity 600ms`};
  opacity: ${props => props.initialized ? props.updated && !props.value ? 0.2 : 1 : 0};
`

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Enter text...',
  spellCheck: false,
})`
  width: calc(100% + 16px);
  padding: 6px 8px;
  margin: 25px -8px 0;
  outline: none;
  border-radius: 100px;
  color: #202124;

  background: #F1F3F4;
  border: 2px solid transparent;
  transition: background 300ms, border 300ms;

  &:hover {
    background: #E8EAED;
  }

  &:focus {
    border-color: #A9C3F8;
    background: transparent;
  }
`;

const App = () => {
  const [url, setUrl] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [updated, setUpdated] = useState(false);
  
  useEffect(() => {
    window.chrome.tabs.getSelected(null, tab => {
      setUrl(tab.url);
      setInitialized(true);
    });
  }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      <QRCode
        size={256}
        fgColor='#3F4144'
        value={url}
        initialized={initialized}
        updated={updated}
      />
      <Input
        value={url}
        onChange={e => {
          setUrl(e.target.value);
          setUpdated(true);
        }}
        onFocus={e => e.target.select()}
      />
    </Wrapper>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));