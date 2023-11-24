import styled from "styled-components";
import {Board} from "./Board";
import {getNewLayout} from "./Catan";
import {useState} from "react";
import {useCookieState} from "use-cookie-state";

function App() {
    const [layout, setLayout] = useState(() => getNewLayout())
    const [fontSizeModifier, setFontSizeModifier] = useCookieState("bgc-font-size", 0)
    const regenerate = () => setLayout(getNewLayout())
    return <AppContainer>
        <Header><h1>Settlers Board Generator</h1></Header>
        <Main>
            {
                layout ?
                    <Board layout={layout} fontSizeModifier={fontSizeModifier}/> :
                    <div>Can't generate layout</div>
            }
        </Main>
        <Footer>
            <button type="button" onClick={regenerate}>Regenerate</button>
            <button type="button" onClick={() => setFontSizeModifier(fontSizeModifier - 1)}>Text Size -</button>
            <button type="button" onClick={() => setFontSizeModifier(fontSizeModifier + 1)}>Text Size +</button>
            <button type="button" onClick={() => setFontSizeModifier(0)}>Reset Text Size</button>
        </Footer>
    </AppContainer>
}

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Header = styled.header`
  text-align: center;
`
const Footer = styled.header`
  text-align: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  gap: 10px;
`

const Main = styled.main`
  display: flex;
  flex: 1;
  min-height: 1px;
`

export default App
