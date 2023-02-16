
import Content from "../../../components/Content.jsx";
import Navigation from "../../../components/Navigation.jsx";
import { getAllCourses, getCourseData } from "../../../lib/courses.js";
import { RichText } from '@graphcms/rich-text-react-renderer';
// set up static paths



async function getCourse(slug) {
    const courseData = await getCourseData(slug);
    console.log(courseData)
    return courseData;
}







export default async function Course({ params, loggedIn=true }) {

    const courseData = await getCourse(params.slug);
    return (
        <div className="grid-cols-[minmax(200px,250px)_minmax(40ch,_1fr)] grid gap-4">
            <Navigation loggedIn={loggedIn} course={courseData} modules={courseData?.modules} lessons={courseData?.lessons} />

            <Content>
            <h1 className="text-3xl font-bold">{courseData.title}</h1>

            {courseData.body && <RichText 
                content={courseData?.body?.json} 
                references={courseData?.body?.references}  
            />}
            
            </Content>
            

        </div>
    );
    }