import React from "react";
import styled from "styled-components";

type TweetProps = {
  tweet: any;
};

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <TweetStyled score={tweet.sentiment.comparative}>
      <img src={tweet.user.profile_image_url} />
      <span>
        {tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text}
      </span>
    </TweetStyled>
  );
};

export default Tweet;

interface TweetStyledProps {
  score: number;
}

const TweetStyled = styled.div<TweetStyledProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 3rem;
  background-color: ${p => {
    if (p.score === 0) {
      return `#FBBC05`;
    } else if (p.score < 0) {
      return `#EA4335`;
    } else {
      return `#34A853`;
    }
  }};
  padding: 1rem;
  & > img {
    border-radius: 50%;
    margin: 1rem;
    width: 3rem;
    height: 3rem;
  }
`;
