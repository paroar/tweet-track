import React from "react";
import styled from "styled-components";

type TweetProps = {
  tweet: any;
};

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <TweetStyled color={tweet.color}>
      <span>
        {tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text}
      </span>
    </TweetStyled>
  );
};

export default Tweet;

interface TweetStyledProps {
  color: string;
}

const TweetStyled = styled.div<TweetStyledProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem;
  width: 28rem;
  height: 7rem;
  background-color: ${p => p.color};
  padding: 0.5rem;
  overflow: hidden;
  & > img {
    border-radius: 50%;
    margin: 1rem;
    width: 3rem;
    height: 3rem;
  }
`;
