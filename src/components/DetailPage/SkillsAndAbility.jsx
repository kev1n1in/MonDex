import PropTypes from "prop-types";
import styled from "styled-components";

const SkillAndAbility = ({ data, isPokemon, isDigimon }) => {
  if (!data) return null;

  return (
    <>
      {isPokemon && data?.abilities?.length > 0 && (
        <>
          <Title>Abilities</Title>
          <Abilities>
            {data.abilities.map((ability, index) => (
              <Ability key={index}>{ability}</Ability>
            ))}
          </Abilities>
        </>
      )}

      {isDigimon && data?.speciesDetails?.skills?.length > 0 && (
        <>
          <Title>Skills</Title>
          <Abilities>
            {data.speciesDetails.skills.slice(0, 3).map((skill, index) => (
              <Ability key={index}>{skill.skill}</Ability>
            ))}
          </Abilities>
        </>
      )}
    </>
  );
};
SkillAndAbility.propTypes = {
  data: PropTypes.shape({
    abilities: PropTypes.arrayOf(PropTypes.string),
    speciesDetails: PropTypes.shape({
      skills: PropTypes.arrayOf(
        PropTypes.shape({
          skill: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
  isPokemon: PropTypes.bool.isRequired,
  isDigimon: PropTypes.bool.isRequired,
};
const Abilities = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  padding: 8px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin: 8px 0;
`;
const Ability = styled.div`
  padding: 8px;
  margin-bottom: 4px;
  background-color: ghostwhite;
  border: 1px solid #979797;
  border-radius: 8px;
  @media (min-width: 480px) {
    font-size: 24px;
  }
`;

export default SkillAndAbility;
