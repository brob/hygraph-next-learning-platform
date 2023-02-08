
import Content from "../../../components/Content.jsx";
import Navigation from "../../../components/Navigation.jsx";
import { getAllCourses, getCourseData } from "../../../lib/courses.js";
import { RichText } from '@graphcms/rich-text-react-renderer';
// set up static paths
export async function getStaticPaths() {
    const paths = await getAllCourses();
    return {
        paths,
        fallback: false,
    };
    }


export async function getStaticProps({ params }) {
    const courseData = await getCourseData(params.slug);
    return {
        props: {
            courseData,
        },
    };
    }


export default function Course({ courseData }) {
    console.log(courseData.body.json)
    return (
        <div className="grid-cols-[minmax(200px,250px)_minmax(40ch,_1fr)] grid gap-4">
            <Navigation course={courseData} lessons={courseData.lessons} />
            <Content>
            <h1 className="text-3xl font-bold">{courseData.title}</h1>

            <RichText 
                content={courseData.body.json} 
                references={courseData.body.references}  
            />

            </Content>
            

        </div>
    );
    }