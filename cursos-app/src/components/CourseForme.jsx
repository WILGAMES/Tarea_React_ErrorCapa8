import { useState } from "react";

function CourseForm() {

  const [name, setName] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(name);
  };

  return (

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Nombre del curso"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">
        Guardar
      </button>

    </form>

  );
}

export default CourseForm;