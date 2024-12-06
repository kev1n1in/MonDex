import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AlertMessage from "../../components/AlertMessage";
import ReturnButton from "../../components/Buttons/Return/ReturnButton";
import Header from "../../components/Header";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import psyduckImg from "./psyduck.png";

const NotFound = () => {
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();
  const buttonOptions = {
    position: "relative",
    label: "Go Back",
    width: "90%",
    height: "40px",
    borderRadius: "10px",
    fontSize: "24px",
  };
  const handleReturn = () => {
    navigate("/pokemon");
  };

  return (
    <>
      {!isOnline && <AlertMessage message="You are offline!" />}
      <Header />
      <Wrapper>
        <Container>
          <Title>Page Not Found!</Title>
          <SubTitle>This is not the web page you are looking for.</SubTitle>
          <ReturnButton onClick={handleReturn} options={buttonOptions} />
        </Container>

        <Image src={psyduckImg} />
      </Wrapper>
    </>
  );
};
const Title = styled.h2`
  text-align: center;
  margin: 20px 40px 0 40px;
  font-size: 40px;
`;
const SubTitle = styled.h2`
  text-align: left;
  margin: 20px 10px;
  font-size: 20px;
  color: gray;
  @media (min-width: 480px) {
    text-align: center;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 1000px) {
    margin-top: 48px;
    flex-direction: row;
  }
`;
const Container = styled.div`
  @media (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const Image = styled.img`
  margin: 0 auto;
  max-width: 276px;
  max-height: 359px;
  @media (min-width: 1000px) {
    margin: 0 40px;
  }
`;

export default NotFound;
