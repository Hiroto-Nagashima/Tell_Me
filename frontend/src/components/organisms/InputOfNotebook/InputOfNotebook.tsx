import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';
import { Box, Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup';
import {
  SingleLineTextField,
  MultipleLinesTextField,
  StyledButton,
} from '../../atoms/index';
import styled from 'styled-components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        width: theme.spacing(70),
        height: theme.spacing(122),
      },
    },
  }),
);

const StyledPaper = styled(Paper)`
  border-radius: 20px;
`;

export type Props = {
  memo: string | null;
  dinner: string | null;
  hasBathed: boolean | null;
  breakfast: string | null;
  selectedDate: Date | string | null;
  bodyTemperature: number | string | null;
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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledPaper elevation={5}>
        <Box component="h1" pt={2} textAlign="center">
          {selectedDate}の連絡帳
        </Box>
        <Box component="h3" px={4} my={4}>
          1. 朝に測った体温を記入してください
        </Box>
        <Box px={4}>
          <Grid container xs={3}>
            <SingleLineTextField
              id="体温"
              isFullWidth={false}
              textName="体温"
              type="number"
              inputProps={{
                min: '36.0',
                step: '0.1',
              }}
              placeholder="36.5"
              value={bodyTemperature}
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
          3. 昨日の夕飯を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <MultipleLinesTextField
            label="夕飯"
            row={2}
            value={dinner}
            variant="outlined"
            onChange={onChangeDinner}
          />
        </Box>
        <Box component="h3" px={4} my={4}>
          4. 今朝の朝食を入力してください
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
        <Box component="h3" px={4} my={4}>
          5. 連絡事項を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <MultipleLinesTextField
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
    </div>
  );
});
InputOfNotebook.displayName = 'InputOfNotebook';
