import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import styled from 'styled-components';
import { Post } from '../../types/api/post';
import { useParams } from 'react-router-dom';
import { CurrentKidContext } from '../../providers/KidProvider';

import { Box } from '@material-ui/core';
import { Spinner } from '../atoms';
import { PostCard } from '../organisms';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Announcement: React.FC = () => {
  const { currentKid } = useContext(CurrentKidContext);
  const { id } = useParams<{ id: string }>();

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Array<Post>>([]);
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
                      content={post.content}
                      teacherId={post.user_id}
                      createdAt={format(
                        new Date(post.created_at),
                        'yyyy-MM-dd HH:mm',
                      )}
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

Announcement.displayName = 'Announcement';
