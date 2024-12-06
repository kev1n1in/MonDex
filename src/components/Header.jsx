import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Title>Mondex</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
const Title = styled.h1`
  font-size: 30px;
`;

export default Header;
