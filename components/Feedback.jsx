import React, {useState} from 'react';
import Radio from './Radio';
import {useUser} from '@clerk/nextjs'
const Form = ({handleSubmit}) => {
    const {user} = useUser();
    const {emailAddresses} = user;
    const email = emailAddresses[0].emailAddress
    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <h3>Submit feedback</h3>
                <div className="flex flex-col">
                    <label htmlFor="helpful">Was this helpful?</label>
                    <div className="flex gap-5">
                        <div className="flex ">
                            <Radio name="helpful" value="veryHelpful" label="Very" />
                        </div>
                        <div className="flex ">
                            <Radio name="helpful" value="helpful" label="Yes" />
                        </div>
                        <div className="flex ">
                            <Radio name="helpful" value="notHelpful" label="No" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input value={email} className="border border-gray-300 rounded-md" type="email" name="email" id="email" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="comments">Comments</label>
                    <textarea className="border border-gray-300 rounded-md" name="comments" id="comments" cols="30" rows="10"></textarea>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
            </form>
    )
}
        

const Feedback = ({lesson}) => {
    const [sent, setSent] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const dataFormat = {
            body: data.comments,
            email: data.email,
            feedbackLevel: data.helpful,
            lesson:  lesson
        }
        const response = fetch('/api/sendFeedback/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataFormat)
        }).then(res => {
            console.log(res)
            setSent(true)
        }).catch(err => {
            console.log(err)
        })
        
    }
    return (
        <div>
            {sent 
                ? <p>Thank you for your feedback!</p> 
                : <Form handleSubmit={handleSubmit} />}     
        </div>
    )
}

export default Feedback;