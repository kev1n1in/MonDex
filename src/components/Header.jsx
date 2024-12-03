import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Title>Pokedex</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 30px;
`;

export default Header;
