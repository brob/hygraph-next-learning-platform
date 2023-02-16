'use client';
import Head from 'next/head'
import Image from 'next/image'
import Content from '../components/Content'
import Main from '../layouts/Main'
function containsLockedModules(modules) {
    return modules.some(module => module.isLocked)
  }

export default function Course({ courses }) {
    
    return (
      
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
    )
    }