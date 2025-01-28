import { AiOutlineSearch } from "react-icons/ai";

import { SearchInputPropsType } from "../types/props.types";

const SearchInput = ({ setSearchQuery, searchQuery }: SearchInputPropsType) => {
    return (
        <div className="absolute bg-white z-10 top-3 sm:top-5 left-15 sm:left-20 rounded-md border-2 border-amber-900 flex justify-center items-center px-5 py-3">
            <AiOutlineSearch className="text-gray-500 text-xl mr-2" />
            <input
                type="text"
                placeholder="Buscar Alfajor ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none outline-none text-gray-700 w-full"
            />
        </div>
    )
}

export default SearchInput