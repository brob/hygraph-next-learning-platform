import Content from "../../../../components/Content";
import Navigation from "../../../../components/Navigation";
import Feedback from "../../../../components/Feedback";
import Main from "../../../../layouts/Main";
import {useUser} from '@clerk/nextjs';


export async function getServerSideProps({params}) {
    const { id } = params;
    const response = await fetch("https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clddka9yq1aw301ui7zzh4kf3/master", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query Lesson($id: ID!) {
                lesson(where: {id: $id}) {
                    id
                    title
                    body {
                        html
                    }
                    moduleModel {
                        isLocked
                    }
                    description
                    title
                    videoUrl
                    navDetails: moduleModel {
                        title
                        course {
                            title
                            slug
                            modules: moduleModels {
                                id
                                isLocked
                                title
                                lessons {
                                  id
                                  title
                                }
                              }
                        }
                        lessons {
                            id
                            title
                        }
                    }
                }
            }
            `,
            variables: {
                id,
            },
        }),
    });
    const json = await response.json();
    console.log(json.errors)
    const data = json.data.lesson;

    return {
        props: {
            ...data,
        },
    };
}





export default function Lesson({id, navDetails, title, body, moduleModel, loggedIn}) {
    const { user } = useUser();
    return (
        <Main>
        <div className="grid-cols-[minmax(200px,250px)_minmax(40ch,_1fr)] grid gap-4">
            <Navigation lessonId={id} course={navDetails.course} modules={navDetails.course.modules} lessons={navDetails.lessons} loggedIn={loggedIn} />
            <Content>
                {(!moduleModel.isLocked || loggedIn) ? (
                <>
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: body.html }} />
                    <Feedback lesson={id} />
                </>)
                
                : (
                    <>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p>You must be logged in to view this content.</p>
                    </>
                )
                }
                
            </Content>
            
        </div>
        </Main>
    );
}