import styled from "styled-components";
import {Board} from "./Board";
import {getNewLayout} from "./Catan";
import {useState} from "react";

function App() {
    const [layout, setLayout] = useState(() => getNewLayout())
    const regenerate = () => setLayout(getNewLayout())
    return <AppContainer>
        <Header><h1>Catan Board Generator</h1></Header>
        <Main>
            {
                layout ?
                    <Board layout={layout}/> :
                    <div>Can't generate layout</div>
            }
        </Main>
        <Footer>
            <button type="button" onClick={regenerate}>Regenerate</button>
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
`

const Main = styled.main`
  display: flex;
  flex: 1;
  min-height: 1px;
`

export default App
