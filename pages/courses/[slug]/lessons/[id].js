import Content from "../../../../components/Content";
import Navigation from "../../../../components/Navigation";
import Feedback from "../../../../components/Feedback";
import Main from "../../../../layouts/Main";

const LOGGEDIN = false;


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
            ...data
        },
    };
}





export default function Lesson(props) {
    console.log({props})
    return (
        <Main>
        <div className="grid-cols-[minmax(200px,250px)_minmax(40ch,_1fr)] grid gap-4">
            <Navigation lessonId={props.id} course={props.navDetails.course} modules={props.navDetails.course.modules} lessons={props.navDetails.lessons} loggedIn={LOGGEDIN} />
            <Content>
                {(!props.moduleModel.isLocked || LOGGEDIN) ? (
                <>
                    <h1 className="text-3xl font-bold">{props.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: props.body.html }} />
                    <Feedback lesson={props.id} />
                </>)
                
                : (
                    <>
                        <h1 className="text-3xl font-bold">{props.title}</h1>
                        <p>You must be logged in to view this content.</p>

                    </>)}
                
            </Content>
            
        </div>
        </Main>
    );
}