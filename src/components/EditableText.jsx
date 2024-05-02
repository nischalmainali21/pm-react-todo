import { useState } from "react";

const EditableText = ({ text, children }) => {
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
