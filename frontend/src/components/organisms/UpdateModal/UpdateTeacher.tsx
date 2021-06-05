import React, { ChangeEvent, memo } from 'react';

import { Box } from '@material-ui/core';
import { MultipleLinesTextField } from '../../atoms/index';

export type Props = {
  selfIntroduction: string | null;
  onChangeSelfIntroduction: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UpdateTeacher: React.FC<Props> = memo((props) => {
  const { selfIntroduction, onChangeSelfIntroduction } = props;

  return (
    <>
      <Box textAlign="center" m={4}>
        <MultipleLinesTextField
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
