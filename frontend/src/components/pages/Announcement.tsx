import { Box } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CurrentUserContext } from '../../providers/UserProvider';
import { Post } from '../../types/api/post';
import { Spinner } from '../atoms';
import { PostCard } from '../organisms';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Announcement: React.FC = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const userNameArr = [currentUser.lastName, currentUser.firstName];
  const userName = userNameArr.join('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const { id } = useParams<{ id: string }>();
  const fetchPosts = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/kids/${id}/fetch_posts`)
      .then((res) => setPosts(res.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>エラーです</div>
      ) : (
        <Wrapper>
          <div>
            {posts.map((post) => {
              return (
                <Box key={post.id} my={2}>
                  <PostCard
                    poster={post.poster}
                    teacherId={post.user_id}
                    content={post.content}
                    createdAt={post.created_at}
                  />
                </Box>
              );
            })}
          </div>
        </Wrapper>
      )}
    </>
  );
};
