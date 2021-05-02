import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);
export type Props = {
  variant: 'text' | 'outlined' | 'contained';
  color: 'default' | 'inherit' | 'primary' | 'secondary';
  onClick: () => void;
};

export const DefaultButton: React.FC<Props> = (props) => {
  const { variant, color, onClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant={variant} color={color} onClick={onClick} />
    </div>
  );
};
