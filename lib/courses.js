
async function getSortedCoursesData() {
    const res = await fetch(
        'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clddka9yq1aw301ui7zzh4kf3/master',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                query: `
                query Courses {
                    courses {
                      createdAt
                      id
                      slug
                      publishedAt
                      title
                      updatedAt
                      
                    }
                  }
                  `,
            
            }),
        }
    );
    const data = await res.json();
    console.log(data.errors)

    return data.data.courses;
}



export const getAllCourses = async () => {
    const courses = await getSortedCoursesData();
    return courses.map((course) => {
        return {
            params: {
                slug: course.slug,
            },
        };
    });
}

export const getCourseData = async (slug) => {
    const res = await fetch('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clddka9yq1aw301ui7zzh4kf3/master', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            query: `
            query Course($slug: String!) {
                course(where: {slug: $slug}) {
                    createdAt
                    id
                    slug
                    publishedAt
                    title
                    updatedAt
                    body {
                        json
                        references {
                            ... on Asset {
                                __typename
                                id
                                url
                                mimeType
                            }
                            ... on Lesson {
                                id
                                title
                            }
                        }
                    }
                    modules: moduleModels {
                        isLocked
                        title
                        lessons {
                          id
                          title
                        }
                      }
                    
                }
            }`,
            variables: {
                slug: slug,
            },
        }),
    });
    const data = await res.json();
    console.log(data.errors)
    return data.data.course;
}