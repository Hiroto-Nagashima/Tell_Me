import React, { memo } from 'react';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { RadioButtonGroup } from '../../molecules/RadioButtonGroup';
import {
  SingleLineTextField,
  MultipleLinesTextField,
  FlexibleButton,
} from '../../atoms/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(100),
      },
    },
  }),
);

export type Props = {
  memo: string | null;
  dinner: string | null;
  hasBathed: boolean | null;
  breakfast: string | null;
  selectedDate: Date | string | null;
  bodyTemperature: number | string | null;
  onClick: () => void;
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
    onClick,
    onChangeMemo,
    onChangeDinner,
    onChangeBreakfast,
    onChangeHasBathed,
    onChangeBodyTemperature,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Box component="h2" pt={2} textAlign="center">
          {selectedDate}の連絡帳
        </Box>
        <Box component="h4" px={4}>
          1. 朝に測った体温を記入してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            id="体温"
            textName="体温"
            type="number"
            isFullWidth={false}
            placeholder="36.5"
            value={bodyTemperature}
            onChange={onChangeBodyTemperature}
          />
        </Box>
        <Box component="h4" px={4}>
          2. 昨晩の入浴の有無を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <RadioButtonGroup
            value={hasBathed}
            firstValue={true}
            secondValue={false}
            onChange={onChangeHasBathed}
            firstLabel="有"
            secondLabel="無"
          />
        </Box>
        <Box component="h4" px={4}>
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
        <Box component="h4" px={4}>
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
        <Box component="h4" px={4}>
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
        <Box textAlign="center" m={2}>
          <FlexibleButton
            onClick={onClick}
            variant="contained"
            color="primary"
            label="登録"
          />
        </Box>
      </Paper>
    </div>
  );
});
InputOfNotebook.displayName = 'InputOfNotebook';
