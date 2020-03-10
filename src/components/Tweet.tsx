import React from "react";
import styled from "styled-components";

type TweetProps = {
  tweet: any;
};

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <>
      <img src={tweet.user.profile_image_url} alt="" />
      <img src={tweet.user.profile_banner_url} alt="" />
      <p>{tweet.user.name}</p>
      <p>{tweet.user.screen_name}</p>
      <p>{tweet.user.location}</p>
      <p>{tweet.user.description}</p>
      <p>{tweet.user.followers_count}</p>
      <p>{tweet.user.friends_count}</p>
      <p>{tweet.user.created_at}</p>
      <TweetStyled color={tweet.color}>
        {tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text}
      </TweetStyled>
    </>
  );
};

export default Tweet;

interface TweetStyledProps {
  color: string;
}

const TweetStyled = styled.div<TweetStyledProps>`
  background-color: ${p => p.color};
  padding: 0.5rem;
`;
