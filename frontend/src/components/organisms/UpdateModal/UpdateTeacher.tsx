import React, { ChangeEvent, memo } from 'react';

import { Box } from '@material-ui/core';
import { TextField } from '../../atoms';

export type Props = {
  selfIntroduction: string | null;
  onChangeSelfIntroduction: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateTeacher: React.FC<Props> = memo((props) => {
  const { selfIntroduction, onChangeSelfIntroduction } = props;

  return (
    <>
      <Box textAlign="center" m={4}>
        <TextField
          label="自己紹介"
          variant="standard"
          row={5}
          value={selfIntroduction}
          onChange={onChangeSelfIntroduction}
        />
      </Box>
    </>
  );
});

UpdateTeacher.displayName = 'UpdateTeacher';
