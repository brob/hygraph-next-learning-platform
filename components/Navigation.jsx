export default function Navigation({lessons, course, lessonId}) {

    return (        
    <div class="shadow-md bg-white px-1">
        <h1 className="text-2xl py-4 px-6 font-bold"><a href={`/courses/${course.slug}/`}>{course.title}</a></h1>
    <ul class="relative">
        {lessons.map(lesson => (
        <li class="relative">
            <a class={`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out ${(lessonId === lesson.id) ? 'bg-gray-100' : ''}`} href={`/courses/${course.slug}/lessons/${lesson.id}`}>{lesson.title}</a>
        </li>
        ))}

    </ul>
</div>)
}