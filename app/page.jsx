import Homepage from './HomePage.jsx'



async function getCourses() {
    const response = await fetch("https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clddka9yq1aw301ui7zzh4kf3/master", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query Courses {
            courses {
              id
              title
              slug
              modules: moduleModels {
                isLocked
              }
            }
          }
          `,
        }),
      });
      const json = await response.json();

      return json.data.courses;
    
}



export default async function Page() {
    const courses = await getCourses();
    return (
        <Homepage courses={courses} />
    )
}