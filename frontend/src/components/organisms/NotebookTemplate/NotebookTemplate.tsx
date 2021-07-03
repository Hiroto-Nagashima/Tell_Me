import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';
import { Box, Typography } from '@material-ui/core';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup/RadioButtonGroup';
import { MultipleLinesTextField, StyledButton } from '../../atoms/index';
import styled from 'styled-components';

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
        <Box component="h3" px={4} my={4}>
          1. 入浴の有無
        </Box>
        <Box mx={4}>
          <RadioButtonGroup
            value={hasBathed}
            firstValue={true}
            secondValue={false}
            onChange={onChangeHasBathed}
            firstLabel="有"
            secondLabel="無"
          />
        </Box>
        <Box component="h3" px={4} my={4}>
          2. 夕飯
        </Box>
        <Box textAlign="center" mx={4}>
          <MultipleLinesTextField
            label="朝食"
            variant="outlined"
            row={6}
            value={dinner}
            onChange={onChangeDinner}
          />
        </Box>
        <Box component="h3" px={4} my={4}>
          3. 朝食
        </Box>
        <Box textAlign="center" mx={4}>
          <MultipleLinesTextField
            label="朝食"
            row={2}
            value={breakfast}
            variant="outlined"
            onChange={onChangeBreakfast}
          />
        </Box>
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
