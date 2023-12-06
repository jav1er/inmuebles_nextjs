import { memo } from "react";

function SearchBar() {
  ////console.log("SearchBar se ha renderizado");
  return (
    <>
      <div className="container-searchbar">
        <h2>DTech Inc</h2>
        <form className="form-searchbar">
          <input className="i" placeholder="buscar" />
        </form>
      </div>
    </>
  );
}

export default memo(SearchBar);
