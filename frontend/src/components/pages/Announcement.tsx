import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Post } from '../../types/api/post';

import { Box } from '@material-ui/core';
import { Spinner } from '../atoms';
import { PostCard } from '../organisms';
import { CurrentKidContext } from '../../providers/KidProvider';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Announcement: React.FC = () => {
  const { currentKid } = useContext(CurrentKidContext);
  const { id } = useParams<{ id: string }>();

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [posts, setPosts] = useState<Array<Post>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    if (currentKid.daycareId) {
      axios
        .get(`${API_ENDPOINT}daycares/${currentKid.daycareId}/posts`)
        .then((res) => setPosts(res.data))
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    } else {
      axios
        .get(`${API_ENDPOINT}daycares/${id}/posts`)
        .then((res) => setPosts(res.data))
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    }
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
            {posts
              .slice(0)
              .reverse()
              .map((post) => {
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
