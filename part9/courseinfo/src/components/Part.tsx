import type { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><em>{part.description}</em></p>
        </div>
      );
    case "group":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><em>{part.description}</em></p>
          <p>submit to: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><em>{part.description}</em></p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled part: ${JSON.stringify(value)}`);
};

export default Part;