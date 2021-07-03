import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';
import { Box, Grid, Typography } from '@material-ui/core';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup/RadioButtonGroup';
import { TextField, StyledButton } from '../../atoms/index';
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
`;

const Title = styled(Typography)`
  padding-top: 8%;
  font-size: clamp(2rem, 8vw - 1.5rem, 2rem);
`;

export type Props = {
  memo: string | null;
  dinner: string | null;
  hasBathed: boolean | null;
  breakfast: string | null;
  selectedDate: Date | string | null;
  bodyTemperature: number | null;
  onClickRegister: () => void;
  onChangeMemo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDinner: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHasBathed: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBreakfast: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBodyTemperature: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputOfNotebook: React.FC<Props> = memo((props) => {
  const {
    memo,
    dinner,
    hasBathed,
    breakfast,
    selectedDate,
    bodyTemperature,
    onClickRegister,
    onChangeMemo,
    onChangeDinner,
    onChangeBreakfast,
    onChangeHasBathed,
    onChangeBodyTemperature,
  } = props;

  return (
    <Wrapper>
      <StyledPaper elevation={5}>
        <Title variant="h1" align="center">
          {selectedDate}の連絡帳
        </Title>
        <Box component="h3" px={4} my={4}>
          1. 朝に測った体温を記入してください(※必須)
        </Box>
        <Box px={4}>
          <Grid container xs={3}>
            <TextField
              row={1}
              type="number"
              label="体温"
              value={bodyTemperature}
              variant="outlined"
              placeholder="36.5"
              inputProps={{
                min: '36.0',
                step: '0.1',
              }}
              onChange={onChangeBodyTemperature}
            />
          </Grid>
        </Box>
        <Box component="h3" px={4} my={4}>
          2. 昨晩の入浴の有無を入力してください
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
          3. 昨日の夕飯を入力してください(※必須)
        </Box>
        <Box textAlign="center" mx={4}>
          <TextField
            label="夕飯"
            row={2}
            value={dinner}
            variant="outlined"
            onChange={onChangeDinner}
          />
        </Box>
        <Box component="h3" px={4} my={4}>
          4. 今朝の朝食を入力してください (※必須)
        </Box>
        <Box textAlign="center" mx={4}>
          <TextField
            label="朝食"
            row={2}
            value={breakfast}
            variant="outlined"
            onChange={onChangeBreakfast}
          />
        </Box>
        <Box component="h3" px={4} my={4}>
          5. 連絡事項を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <TextField
            label="連絡事項"
            row={2}
            value={memo}
            variant="outlined"
            onChange={onChangeMemo}
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
InputOfNotebook.displayName = 'InputOfNotebook';
