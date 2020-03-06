import React from "react";
import sprite from "../img/sprite.svg";
import styled from "styled-components";

type SvgProps = {
  lat: number;
  lng: number;
  class?: string;
  iconName: string;
  svgFill?: string;
};

const Svg: React.FC<SvgProps> = props => {
  const { iconName, svgFill } = props;

  return (
    <SvgStyled className={iconName} fill={svgFill ? svgFill : ""}>
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
