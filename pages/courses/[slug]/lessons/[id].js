import Content from "../../../../components/Content";
import Navigation from "../../../../components/Navigation";
import Feedback from "../../../../components/Feedback";

export async function getStaticPaths() {

    const response = await fetch("https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clddka9yq1aw301ui7zzh4kf3/master", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query Lessons {
                lessons {
                  id 
                  title
                  course {
                    slug                    
                  }
                }
              }
              `,
        }),
    });
    const data = await response.json();
    const paths = data.data.lessons.map((lesson) => {
        return {
            params: {
                id: lesson.id,
                slug: lesson.course.slug
            },
        };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
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
                    description
                    title
                    videoUrl
                    course {
                        slug
                        title
                        lessons {
                            id
                            title
                        }
                    }
                }
            }
            `,
            variables: {
                id: params.id,
            },
        }),
    });
    const json = await response.json();
    const data = json.data.lesson;

    return {
        props: {
            ...data
        },
    };
}

export default function Lesson(props) {

    return (
        <div className="grid-cols-[minmax(200px,250px)_minmax(40ch,_1fr)] grid gap-4">
            <Navigation lessonId={props.id} course={props.course} lessons={props.course.lessons} />
            <Content>
                <h1 className="text-3xl font-bold">{props.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: props.body.html }} />
                <Feedback lesson={props.id} />
            </Content>
            
        </div>
    );
}