import Head from 'next/head'
import Image from 'next/image'
import Content from '../components/Content'
import Main from '../layouts/Main'
import { ClerkProvider, useUser, SignIn, UserButton, SignedOut } from '@clerk/nextjs'

function containsLockedModules(modules) {
  return modules.some(module => module.isLocked)
}


export async function getServerSideProps() {
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
  console.log(json.errors)
  const data = json.data.courses;
  console.log(data)

  return {
    props: {
      courses: data,
    },
  };
}

export default function Home({courses}) {
  const { isLoaded, isSignedIn, user } = useUser()
  console.log(user)
  return (
    <Main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <h1 className="text-3xl font-bold">Our Courses</h1>
        {courses.map((course) => {
          return (
            <div key={course.id}>
              <h2 className="text-2xl font-bold"><a href={`/courses/${course.slug}`}>{course.title}</a> {course.isLocked}  {(containsLockedModules(course.modules) && "🔒")}</h2>              
            </div>
          );

        }
        )}
      </Content>
      </Main>
  )
}
