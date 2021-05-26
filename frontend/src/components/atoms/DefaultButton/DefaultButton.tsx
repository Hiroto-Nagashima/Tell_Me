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
  onClick?: () => void;
  label: string;
  size: 'small' | 'medium' | 'large';
  variant: 'text' | 'outlined' | 'contained';
  color: 'default' | 'inherit' | 'primary' | 'secondary';
};

export const DefaultButton: React.FC<Props> = (props) => {
  const { variant, color, onClick, label, size } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant={variant} color={color} onClick={onClick} size={size}>
        {label}
      </Button>
    </div>
  );
};
