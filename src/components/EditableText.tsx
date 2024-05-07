import { useState } from "react";

interface EditableTextProps {
  text: string;
  children: React.ReactNode;
}

const EditableText = ({ text, children }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <div onBlur={() => setIsEditing(false)}>{children}</div>
      ) : (
        <div onDoubleClick={() => setIsEditing(true)}>{text}</div>
      )}
    </>
  );
};

export default EditableText;
