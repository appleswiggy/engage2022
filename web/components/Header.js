import Dropdown from "./Dropdown"

function Header({ text }) {
  return (
    <div className="ml-36 flex flex-row justify-between mt-9 -mb-12 mr-36">
        <div className="heading_style text-white">
            {text}
        </div>
        <div>
            <Dropdown />
        </div>
    </div>
  )
}

export default Header