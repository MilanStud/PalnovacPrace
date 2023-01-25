import styled from "styled-components";

// export , aby bzlo dostupno jinde
export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background-color: silver;
`;
export const PersonList = styled.div`
  min-height: 50px;
  width: 500px;
  align-items: center;
  background-color: white;
  /* flex-grow: 1; */
  padding-top: 3px;
  padding-bottom: 3px;
`;

export const PersonItems = styled.div`
  min-height: 50px;
  width: 100%;
  text-align: left;
  background-color: gray;
  /* flex-grow: 1; */
  border-bottom: 1px solid white;
  padding: 2px;
`;

export const Work = styled.div`
  min-height: 50px;
  width: 70%;
  align-items: center;
  /* background-color: white; */
  /* flex-grow: 1; */
  padding-top: 20px;
  padding-bottom: 3px;
`;

export const TabButton = styled.button`
background-color: gray;
padding:5px;
border: 1px solid black;
margin:5px;
${props => {
    if (props.name === props.activeTab) {
      return `background-color: white;`
    }
  }}
`;

export const KillTheDog = styled.div`
  display: flex;
  position: relative;
  z-index: 50;
  height: 20px;
  width: 20px;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  color: red;
  top: -20px;
  border-radius: 50%;
  border: 1px solid red;
  cursor: pointer;
`;