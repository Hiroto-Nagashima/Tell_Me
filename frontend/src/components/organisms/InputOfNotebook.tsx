import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { SingleLineTextField } from '../atoms/SingleLineTextField';
import { MultipleLinesTextField } from '../atoms/MultipleLinesTextField';
import { FlexibleButton } from '../atoms/FlexibleButton';
import { RadioButtonGroup } from '../molecules/RadioButtonGroup';

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
  bath: 0 | 1 | null;
  memo: string | null;
  dinner: string | null;
  breakfast: string | null;
  selectedDate: Date | string;
  bodyTemperature: number | string | null;
  onClick: () => void;
  onChangeMemo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBath: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDinner: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBreakfast: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBodyTemperature: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputOfNotebook: React.FC<Props> = (props) => {
  const {
    selectedDate,
    bodyTemperature,
    bath,
    memo,
    dinner,
    breakfast,
    onClick,
    onChangeBath,
    onChangeMemo,
    onChangeDinner,
    onChangeBreakfast,
    onChangeBodyTemperature,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Box component="h2" pt={2} textAlign="center">
          {selectedDate}の連絡帳
        </Box>
        <Box component="h4" px={2} textAlign="center">
          1. 朝に測った体温を記入してください
        </Box>
        <Box textAlign="center" mx={4}>
          <SingleLineTextField
            textName="体温"
            isFullWidth={false}
            placeholder="36.5"
            value={bodyTemperature}
            onChange={onChangeBodyTemperature}
          />
        </Box>
        <Box component="h4" px={2} textAlign="center">
          2. 昨晩の入浴の有無を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <RadioButtonGroup
            value={bath}
            onChange={onChangeBath}
            firstLabel="有"
            secondLabel="無"
          />
        </Box>
        <Box component="h4" px={2} textAlign="center">
          3. 昨日の夕飯を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <MultipleLinesTextField
            label="夕飯"
            row={2}
            value={dinner}
            onChange={onChangeDinner}
          />
        </Box>
        <Box component="h4" px={2} textAlign="center">
          4. 今朝の朝食を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <MultipleLinesTextField
            label="朝食"
            row={2}
            value={breakfast}
            onChange={onChangeBreakfast}
          />
        </Box>
        <Box component="h4" px={2} textAlign="center">
          5. 連絡事項を入力してください
        </Box>
        <Box textAlign="center" mx={4}>
          <MultipleLinesTextField
            label="連絡事項"
            row={2}
            value={memo}
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
};
