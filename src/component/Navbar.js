import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav class="flex px-4 border-b md:shadow-lg items-center relative">
      <div class="text-lg font-bold md:py-0 py-4">React CRUD</div>
      <ul class="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">
        <NavLink to={"/"}>
          <li>
            <a
              href="#"
              class="flex md:inline-flex p-4 items-center hover:bg-gray-50"
            >
              <span className="btn btn-light">Home</span>
            </a>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
