const Radio = ({name, value, label}) => {
    return (
        <>
        <input type="radio" name={name} id={value} value={value} className="hidden peer" />
        <label className="inline-flex items-center justify-between w-full py-2 px-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700" htmlFor={value}>{label}</label>
        </>
        )
}

export default Radio