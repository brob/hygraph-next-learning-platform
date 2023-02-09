import Topbar from "./Topbar"

export default function Navigation({course, lessonId, modules, loggedIn}) {
    console.log({loggedIn})
    return (  
        <>
        <div className="shadow-md bg-white px-1">

        <h1 className="text-2xl py-4 px-6 font-bold"><a href={`/courses/${course.slug}/`}>{course.title}</a></h1>
        {modules && modules.map(module => (
            <div key={module.id} className="relative">
                <h2 className="text-xl py-4 px-6 font-bold">{module.title}</h2>
                <ul className="relative">
                    {module.lessons && module.lessons.map(lesson => (
                        <li key={lesson.id} className="relative">
                            { (module.isLocked && !loggedIn) ? (
                                <div className={`cursor-not-allowed flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out ${(lessonId === lesson.id) ? 'bg-gray-100' : ''}`}>{lesson.title} {module.isLocked && <span className="text-red-500">🔒</span>}</div>
                                ) : (
                                <a className={`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out ${(lessonId === lesson.id) ? 'bg-gray-100' : ''}`} href={`/courses/${course.slug}/lessons/${lesson.id}`}>{lesson.title}</a>
                            )                            
                            }                           
                        </li>
                    ))}
                </ul>

            </div>
        ))}

</div>
        </>      
    )
}