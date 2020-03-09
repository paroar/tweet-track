import React from "react";
import sprite from "../img/sprite.svg";
import styled from "styled-components";

type SvgProps = {
  class?: string;
  iconName: string;
  color?: string;
};

const Svg: React.FC<SvgProps> = props => {
  const { iconName, color } = props;

  return (
    <SvgStyled className={`icon ${iconName}`} fill={color ? color : ""}>
      <use href={`${sprite}#${iconName}`} />
    </SvgStyled>
  );
};

export default Svg;

interface SvgStyledProps {
  fill: string;
}

const SvgStyled = styled.svg<SvgStyledProps>`
  fill: ${p => p.fill};
`;
