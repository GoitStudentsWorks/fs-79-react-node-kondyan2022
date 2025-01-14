import { useEffect, useState } from 'react';
import { BodyPartsBoard } from '../ExercisesBoard/BodyPartsBoard';
import { EquipmentBoard } from '../ExercisesBoard/EquipmentBoard';
import { MusclesBoard } from '../ExercisesBoard/MusclesBoard';
import { ExercisesNavigation } from '../ExercisesNavigation/ExercisesNavigation';
import {
  ExercisesBox,
  ExercisesPageWrap,
  ExercisesTitle,
} from './ExercisesWrap.styled';
import { ExerciseList } from '../ExerciseList/ExerciseList';

export const ExersizeWrap = () => {
  const [activeBoard, setActiveBoard] = useState('Body parts');
  const [exerciseName, setExerciseName] = useState('');

  const handleBoardClick = (filter) => {
    setActiveBoard(filter);

    const url = new URL(window.location);
    url.searchParams.set('activeBoard', filter);
    window.history.pushState({}, '', url.toString());
  };

  const handleExNameClick = (name) => {
    setExerciseName(name);

    const url = new URL(window.location);
    url.searchParams.set('exerciseName', name);
    window.history.pushState({}, '', url.toString());
  };

  useEffect(() => {
    const url = new URL(window.location);
    const activeBoardParam = url.searchParams.get('activeBoard');
    if (activeBoardParam) {
      setActiveBoard(activeBoardParam);
    }
  }, []);

  useEffect(() => {
    const url2 = new URL(window.location);
    const exerciseNameParam = url2.searchParams.get('exerciseName');
    if (exerciseNameParam) {
      setExerciseName(exerciseNameParam);
    }
  }, []);

  const capitalizeFirstLeter = (string) => {
    const newString = string.slice(0, 1).toUpperCase() + string.slice(1);
    return newString;
  };

  return (
    <ExercisesPageWrap>
      <ExercisesBox>
        {exerciseName ? (
          <ExercisesTitle>{capitalizeFirstLeter(exerciseName)}</ExercisesTitle>
        ) : (
          <ExercisesTitle>Exercises</ExercisesTitle>
        )}
        <ExercisesNavigation
          exerciseName={exerciseName}
          setExerciseName={setExerciseName}
          activeBoard={activeBoard}
          handleBoardClick={handleBoardClick}
        />
      </ExercisesBox>

      {activeBoard === 'Body parts' && (
        <BodyPartsBoard
          handleBoardClick={handleBoardClick}
          handleExNameClick={handleExNameClick}
        />
      )}

      {activeBoard === 'Muscles' && (
        <MusclesBoard
          handleBoardClick={handleBoardClick}
          handleExNameClick={handleExNameClick}
        />
      )}

      {activeBoard === 'Equipment' && (
        <EquipmentBoard
          handleBoardClick={handleBoardClick}
          handleExNameClick={handleExNameClick}
        />
      )}

      {activeBoard === exerciseName && (
        <ExerciseList
          exerciseName={exerciseName}
          handleBoardClick={handleBoardClick}
          handleExNameClick={handleExNameClick}
        />
      )}
    </ExercisesPageWrap>
  );
};
