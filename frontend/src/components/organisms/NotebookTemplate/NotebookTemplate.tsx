import React, { memo } from 'react';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import { Box, Typography } from '@material-ui/core';
import { StyledButton } from '../../atoms/';
import { LabeledTextField, LabeledRadioButtonGroup } from '../../molecules';

const Wrapper = styled(Box)`
  margin: 1%;
  padding: 2%;
  width: 100%;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  border-radius: 20px;
  width: 100%;
`;

const Title = styled(Typography)`
  padding-top: 8%;
  font-size: clamp(2rem, 8vw - 1.5rem, 2rem);
`;

export type Props = {
  dinner: string | null;
  hasBathed: boolean | null;
  breakfast: string | null;
  onClickRegister: () => void;
  onChangeDinner: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHasBathed: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBreakfast: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NotebookTemplate: React.FC<Props> = memo((props) => {
  const {
    dinner,
    hasBathed,
    breakfast,
    onClickRegister,
    onChangeDinner,
    onChangeBreakfast,
    onChangeHasBathed,
  } = props;

  return (
    <Wrapper>
      <StyledPaper elevation={5}>
        <Title variant="h1" align="center">
          テンプレートの作成
        </Title>
        <Box component="p" mr={5} textAlign="right">
          ※最大3個
        </Box>
        <LabeledRadioButtonGroup
          value={hasBathed}
          component="h3"
          mainLabel="1. 入浴の有無"
          firstLabel="有"
          secondLabel="無"
          firstValue={true}
          secondValue={false}
          onChange={onChangeHasBathed}
        />
        <LabeledTextField
          row={2}
          value={dinner}
          component="h3"
          mainLabel="2. 夕飯"
          inputLabel="夕飯"
          onChange={onChangeDinner}
        />
        <LabeledTextField
          row={2}
          value={breakfast}
          component="h3"
          mainLabel="3. 朝食"
          inputLabel="朝食"
          onChange={onChangeBreakfast}
        />
        <Box textAlign="center" m={4}>
          <StyledButton
            onClick={onClickRegister}
            variant="contained"
            label="登録"
            fontSize={20}
            width={90}
            borderRadius={20}
          />
        </Box>
      </StyledPaper>
    </Wrapper>
  );
});

NotebookTemplate.displayName = 'NotebookTemplate';
