
import Content from "../../../components/Content.jsx";
import Navigation from "../../../components/Navigation.jsx";
import { getAllCourses, getCourseData } from "../../../lib/courses.js";
import { RichText } from '@graphcms/rich-text-react-renderer';
import Main from "../../../layouts/Main.jsx";
// set up static paths

export async function getServerSideProps({ params }) {
    const courseData = await getCourseData(params.slug);
    return {
        props: {
            courseData,
        },
    };
    }





export default function Course({ courseData, loggedIn }) {
    console.log(courseData)
    return (
        <Main>
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
        </Main>
    );
    }