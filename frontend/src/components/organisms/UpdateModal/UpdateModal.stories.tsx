import { Story, Meta } from '@storybook/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { StyledButton } from '../../atoms';
import { Props, UpdateModal } from './UpdateModal';
import { UpdateKid } from './UpdateKid';
import { UpdateTeacher } from './UpdateTeacher';
import { UpdateParent } from './UpdateParent';

export default {
  title: 'organisms/UpdaterModal',
  component: UpdateModal,
  argTypes: {
    onClickSubmitKidImage: { action: 'onClick' },
    tryUpdateKid: { action: 'onClick' },
    onCloseModal: { action: 'onClick' },
    tryResizeFile: { action: 'onClick' },
    onChangeAge: { action: 'onChange' },
  },
} as Meta;

export const UpdateKidModal: Story<Props> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState(0);
  const [kidLastName, setKidLastName] = useState<string>('');
  const [kidFirstName, setKidFirstName] = useState<string>('');
  const [favoriteFood, setFavoriteFood] = useState<string>('');
  const [favoritePlay, setFavoritePlay] = useState<string>('');

  const onChangeAge = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      const value = Number(e.target.value);

      return setAge(value);
    },
    [],
  );

  const onChangeKidFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setKidFirstName(e.target.value);
    },
    [],
  );

  const onChangeKidLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setKidLastName(e.target.value);
    },
    [],
  );

  const onChangeGender = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    return setGender(value);
  }, []);

  const onChangeFavoriteFood = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setFavoriteFood(e.target.value);
    },
    [],
  );

  const onChangeFavoritePlay = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setFavoritePlay(e.target.value);
    },
    [],
  );

  return (
    <>
      <StyledButton onClick={() => setIsModalOpen(true)} label="PUSH" />
      <UpdateModal
        {...args}
        onCloseModal={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
      >
        <UpdateKid
          age={age}
          gender={gender}
          lastName={kidLastName}
          firstName={kidFirstName}
          favoriteFood={favoriteFood}
          favoritePlay={favoritePlay}
          onChangeAge={onChangeAge}
          onChangeGender={onChangeGender}
          onChangeLastName={onChangeKidLastName}
          onChangeFirstName={onChangeKidFirstName}
          onChangeFavoriteFood={onChangeFavoriteFood}
          onChangeFavoritePlay={onChangeFavoritePlay}
        />
      </UpdateModal>
    </>
  );
};

export const UpdateTeacherModal: Story<Props> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selfIntroduction, setSelfIntroduction] = useState<string | null>('');

  const onChangeSelfIntroduction = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelfIntroduction(e.target.value);
    },
    [],
  );

  return (
    <>
      <StyledButton onClick={() => setIsModalOpen(true)} label="PUSH" />
      <UpdateModal
        {...args}
        onCloseModal={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
      >
        <UpdateTeacher
          selfIntroduction={selfIntroduction}
          onChangeSelfIntroduction={onChangeSelfIntroduction}
        />
      </UpdateModal>
    </>
  );
};

export const UpdateParentModal: Story<Props> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [parentLastName, setParentLastName] = useState<string>('');
  const [parentFirstName, setParentFirstName] = useState<string>('');
  const [telephoneNumber, setTelephoneNumber] = useState('');

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  }, []);

  const onChangeParentFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setParentFirstName(e.target.value);
    },
    [],
  );

  const onChangeParentLastName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setParentLastName(e.target.value);
    },
    [],
  );

  const onChangeTelephoneNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return setTelephoneNumber(e.target.value);
    },
    [],
  );

  return (
    <>
      <StyledButton onClick={() => setIsModalOpen(true)} label="PUSH" />
      <UpdateModal
        {...args}
        onCloseModal={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
      >
        <UpdateParent
          email={email}
          lastName={parentLastName}
          firstName={parentFirstName}
          telephoneNumber={telephoneNumber}
          onChangeEmail={onChangeEmail}
          onChangeLastName={onChangeParentLastName}
          onChangeFirstName={onChangeParentFirstName}
          onChangeTelephoneNumber={onChangeTelephoneNumber}
        />
      </UpdateModal>
    </>
  );
};
